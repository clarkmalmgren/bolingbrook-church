import { Injectable }           from '@angular/core';
import * as firebase            from 'firebase';
import { Env }                  from './env';
import { Observable, Observer } from './observable';

@Injectable()
export class FirebaseService {
  
  fb = firebase;
  initialized = false;
  storage: firebase.storage.Storage;
  
  constructor(private env: Env) {}

  private init() {
    if (!this.initialized) {
      this.fb.initializeApp(this.env.firebaseConfig);
      this.storage = this.fb.storage();
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
  
}

