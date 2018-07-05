import { Injectable }               from '@angular/core';
import * as firebase                from 'firebase/app';
import                                   'firebase/auth';
import                                   'firebase/database';
import                                   'firebase/storage';
import { Env }                      from './env';
import { Observable, Observer }     from './observable';
import {
  FirebaseDatabase,
  FirebaseService,
  FirebaseStorage,
  FirebaseUtils
}                                   from './firebase.service';

export class FirebaseBrowserStorage implements FirebaseStorage {

  constructor(private storage: firebase.storage.Storage) {}

  getUrl(path: string): Observable<string> {
    if (!path || path.length < 1) {
      return Observable.of(undefined);
    }

    return observe(this.storage.ref(path).getDownloadURL());
  }

  upload(path: string, file: File): Observable<any> {
    if (!path || path.length < 1) {
      return Observable.throw(new Error('No uploading to root!'));
    }

    return observe(this.storage.ref(path).put(file));
  }

  delete(path: string): Observable<any> {
    return observe(this.storage.ref(path).delete());
  }
}

export class FirebaseBrowserDatabase implements FirebaseDatabase {

  constructor(private database: firebase.database.Database) {}

  exists(path: string): Observable<Boolean> {
    return observe(this.database.ref(path).once('value'))
      .map((snap: firebase.database.DataSnapshot) => snap.exists());
  }

  getOnce<T>(path: string): Observable<T> {
    return observe(this.database.ref(path).once('value'))
      .map((snap: firebase.database.DataSnapshot) => snap.val());
  }

  watch<T>(path: string): Observable<T> {
    return Observable
      .create((observer: Observer<T>) => {
        this.database.ref(path).on('value', (snap) => {
          observer.next(snap.val());
        });
      });
  }

  put(path: string, value: any): Observable<any> {
    return observe(this.database.ref(path).set(value));
  }

  push(path: string, value: any): Observable<any> {
    return observe(this.database.ref(path).push(value));
  }

  delete(path: string): Observable<any> {
    return observe(this.database.ref(path).remove());
  }
}

@Injectable()
export class FirebaseBrowserService extends FirebaseService {

  initialized = false;
  fb = firebase;
  private _user: firebase.User;

  constructor(private env: Env) {
    super();
  }

  private init(): Observable<firebase.User> {
    if (!this.initialized) {
      this.fb.initializeApp(this.env.firebaseConfig);
      this.initialized = true;

      return Observable.create((observer: Observer<firebase.User>) => {
        this.fb.auth().onAuthStateChanged(
          (user: firebase.User) => {
            this._user = user;
            observer.next(user);
            observer.complete();
          },
          (err: any) => {
            observer.error(err);
          }
        );
      });
    }

    return Observable.of(this._user);
  }

  public auth(): Observable<any> {
    this.init();

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return observe(this.fb.auth().signInWithPopup(provider))
      .map((result) => {
        return this._user = result.user;
      });
  }

  public logout(): Observable<any> {
    const cb = (_ => {
      this._user = undefined;
      return _;
    });

    this.init();

    return observe(this.fb.auth().signOut())
      .map(cb)
      .catch(cb);
  }

  authenticated(): Observable<boolean> {
    return this.init().map(user => !!user);
  }

  storage(): Observable<FirebaseStorage> {
    return this
      .init()
      .map(_ => new FirebaseBrowserStorage(this.fb.storage()) );
  }

  database(): Observable<FirebaseDatabase> {
    return this
      .init()
      .map(_ => new FirebaseBrowserDatabase(this.fb.database()));
  }
}

function observe<T>(promise: PromiseLike<any>): Observable<any> {
  return Observable.create((observer: Observer<any>) => {
    promise
      .then(
        (val) => {
          observer.next(val || '');
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
  });
}
