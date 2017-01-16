import { Injectable }           from '@angular/core';
import * as firebase            from 'firebase';
import { Env }                  from './env';
import { Observable, Observer } from './observable';

@Injectable()
export class FirebaseService {
  
  fb = firebase;
  initialized = false;
  storage: firebase.storage.Storage;
  database: firebase.database.Database;
  
  constructor(private env: Env) {}

  private init() {
    if (!this.initialized) {
      this.fb.initializeApp(this.env.firebaseConfig);
      this.storage = this.fb.storage();
      this.database = this.fb.database();
      this.initialized = true;
    }
  }

  getStorageUrl(path: string): Observable<string> {
    this.init();
    return Observable.create((observer: Observer<string>) => {
      this.storage.ref(path).getDownloadURL()
        .then((val) => { observer.next(val); observer.complete(); } )
        .catch((err) => { observer.error(err); })
    });
  }
  
  getDataOnce(path: string): Observable<any> {
    this.init();
    return Observable.create((observer: Observer<any>) => {
      this.database.ref(path)
        .once('value')
        .then((snap: firebase.database.DataSnapshot) => {
          observer.next(snap.val());
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

