import { Observable } from './observable';

export abstract class Aperture {
  innerHeight: number;
  innerWidth: number;
  ga: Function;
  browser: boolean;
  abstract scrollTo(options?: ScrollToOptions): void;
  abstract open(url?: string, target?: string, features?: string, replace?: boolean): Aperture;
  abstract set(key: string, value: any): void;
  abstract now(): number;
  abstract create(target: any): Aperture;
  abstract observableWindowEvent(eventName: string): Observable<Event>;
}
