import { Injectable }           from '@angular/core';
import * as firebase            from 'firebase';
import { Env }                  from './env';
import { Observable, Observer } from './observable';

@Injectable()
export class FirebaseService {

  fb = firebase;
  initialized = false;
  private _storage: firebase.storage.Storage;
  private _database: firebase.database.Database;
  private _user: firebase.User;

  constructor(private env: Env) {}

  private init(): Observable<firebase.User> {
    if (!this.initialized) {
      this.fb.initializeApp(this.env.firebaseConfig);
      this._storage = this.fb.storage();
      this._database = this.fb.database();
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

  authenticated(): Observable<boolean> {
    return this.init().map(user => !!user);
  }

  get storage(): Observable<firebase.storage.Storage> {
    return this.init().map(_ => this._storage);
  }

  get database(): Observable<firebase.database.Database> {
    return this.init().map(_ => this._database);
  }
}

@Injectable()
export class Storage {

  constructor(private fb: FirebaseService) {}

  getUrl(path: string): Observable<string> {
    if (!path || path.length < 1) {
      return Observable.of(undefined);
    }

    return this.fb.storage
      .flatMap(store => observe(store.ref(path).getDownloadURL()));
  }

  upload(path: string, file: File): Observable<any> {
    if (!path || path.length < 1) {
      return Observable.throw(new Error('No uploading to root!'));
    }

    return this.fb.storage
      .flatMap(store => observe(store.ref(path).put(file)));
  }

  delete(path: string): Observable<any> {
    return this.fb.storage
      .flatMap(store => observe(store.ref(path).delete()));
  }
}

@Injectable()
export class Database {

  constructor(private fb: FirebaseService) {}

  exists(path: string): Observable<Boolean> {
    return this.fb.database
      .flatMap(db => db.ref(path).once('value'))
      .map((snap: firebase.database.DataSnapshot) => snap.exists());
  }

  getOnce(path: string): Observable<any> {
    return this.fb.database
      .flatMap(db => db.ref(path).once('value'))
      .map((snap: firebase.database.DataSnapshot) => snap.val());
  }

  watch(path: string): Observable<any> {
    return Observable
      .create((observer: Observer<any>) => {
        this.fb.database
          .subscribe(db => db.ref(path).on('value', (snap) => {
            observer.next(snap.val());
          }));
      });
  }

  put(path: string, value: any): Observable<any> {
    return this.fb.database
      .flatMap(db => observe(db.ref(path).set(value)));
  }

  push(path: string, value: any): Observable<any> {
    return this.fb.database
      .flatMap(db => observe(db.ref(path).push(value)));
  }

  delete(path: string): Observable<any> {
    return this.fb.database
      .flatMap(db => observe(db.ref(path).remove()));
  }

  toArray<T>(data: { [key: string]: T }, idKey?: string): T[] {
    return Object.keys(data)
      .sort()
      .map((key) => {
        const d = data[key];
        if (idKey) {
          d[idKey] = key;
        }
        return d;
      });
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
