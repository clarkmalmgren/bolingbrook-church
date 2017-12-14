import { Env }          from './env';
import { Observable }   from './observable';

export class FirebaseUtils {

  static toArray<T>(data: { [key: string]: T }, idKey?: string): T[] {
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

export abstract class FirebaseService {

  abstract auth(): Observable<any>;
  abstract logout(): Observable<any>;
  abstract authenticated(): Observable<boolean>;
  abstract storage(): Observable<FirebaseStorage>;
  abstract database(): Observable<FirebaseDatabase>;

}

export interface FirebaseStorage {
  getUrl(path: string): Observable<string>;
  upload(path: string, file: File): Observable<any>;
  delete(path: string): Observable<any>;
}

export interface FirebaseDatabase {

  exists(path: string): Observable<Boolean>;
  getOnce<T>(path: string): Observable<T>;
  watch<T>(path: string): Observable<T>;
  put(path: string, value: any): Observable<any>;
  push(path: string, value: any): Observable<any>;
  delete(path: string): Observable<any>;

}
