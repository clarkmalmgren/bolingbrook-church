import { Injectable }               from '@angular/core';
import { HttpClient }               from '@angular/common/http';
import { Env }                      from './env';
import { Observable, Observer }     from './observable';
import {
  FirebaseDatabase,
  FirebaseService,
  FirebaseStorage,
  FirebaseUtils
}                                   from './firebase.service';


export class FirebaseServerStorage implements FirebaseStorage {

  getUrl(path: string): Observable<string> {
    const encoded = encodeURIComponent(path.replace(/^\/+/, ''));
    return Observable.of(`https://firebasestorage.googleapis.com/v0/b/bolingbrook-church.appspot.com/o/${encoded}`);
  }

  upload(path: string, file: File): Observable<any> {
    return Observable.throw('Storage.upload(...) not supported on server');
  }

  delete(path: string): Observable<any> {
    return Observable.throw('Storage.delete(...) not supported on server');
  }
}

export class FirebaseServerDatabase implements FirebaseDatabase {

  constructor(private env: Env, private http: HttpClient) { }

  private buildUrl(path: string): string {
    return [this.env.firebaseConfig.databaseURL, path]
      .map(s => s.replace(/^\/+/, ''))
      .map(s => s.replace(/\/+$/, ''))
      .join('/') + '.json';
  }

  exists(path: string): Observable<Boolean> {
    return this.getOnce(path).map(val => !!val)
  }

  getOnce<T>(path: string): Observable<T> {
    return this.http.get<T>(this.buildUrl(path));
  }

  watch<T>(path: string): Observable<T> {
    return this.getOnce(path);
  }

  put(path: string, value: any): Observable<any> {
    return Observable.throw('FirebaseDatabase.put(...) not supported on server');
  }

  push(path: string, value: any): Observable<any> {
    return Observable.throw('FirebaseDatabase.push(...) not supported on server');
  }

  delete(path: string): Observable<any> {
    return Observable.throw('FirebaseDatabase.delete(...) not supported on server');
  }
}

@Injectable()
export class FirebaseServerService extends FirebaseService {

  private static initialized: boolean = false;
  private _storage: FirebaseServerStorage;
  private _database: FirebaseServerDatabase;

  constructor(private env: Env, private http: HttpClient) {
    super();

    this._storage = new FirebaseServerStorage();
    this._database = new FirebaseServerDatabase(env, http);
  }

  public auth(): Observable<any> {
    return Observable.throw('No custom authentication allowed on server');
  }

  public logout(): Observable<any> {
    return Observable.throw('No custom authentication allowed on server');
  }

  authenticated(): Observable<boolean> {
    return Observable.of(false);
  }

  storage(): Observable<FirebaseStorage> {
    return Observable.of(this._storage);
  }

  database(): Observable<FirebaseDatabase> {
    return Observable.of(this._database);
  }
}
