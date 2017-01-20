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
  
  constructor(private env: Env) {}

  private init() {
    if (!this.initialized) {
      this.fb.initializeApp(this.env.firebaseConfig);
      this._storage = this.fb.storage();
      this._database = this.fb.database();
      this.initialized = true;
    }
  }

  get storage(): firebase.storage.Storage {
    this.init();
    return this._storage;
  }

  get database(): firebase.database.Database {
    this.init();
    return this._database;
  }
}

@Injectable()
export class Storage {

  constructor(private fb: FirebaseService) {}

  getUrl(path: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      this.fb.storage.ref(path).getDownloadURL()
        .then((val) => { observer.next(val); observer.complete(); } )
        .catch((err) => { observer.error(err); })
    });
  }
}

@Injectable()
export class Database {

  constructor(private fb: FirebaseService) {}

  getOnce(path: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.fb.database.ref(path)
        .once('value')
        .then((snap: firebase.database.DataSnapshot) => {
          observer.next(snap.val());
          observer.complete();
        })
        .catch((err) => { observer.error(err); });
    });
  }

  put(path: string, value: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.fb.database.ref(path)
        .set(value)
        .then(() => {
          observer.next('');
          observer.complete();
        })
        .catch((err) => { observer.error(err); });
    });
  }

  push(path: string, value: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.fb.database.ref(path)
        .push(value)
        .then(() => {
          observer.next('');
          observer.complete();
        })
        .catch((err) => { observer.error(err); });
    });
  }

  toArray<T>(data: { [key: string]: T }): T[] {
    return Object.keys(data)
      .sort()
      .map((key) => {
        let d = data[key];
        d['_id'] = key;
        return d;
      });
  }
}