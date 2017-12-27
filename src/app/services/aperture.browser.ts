import { Aperture }   from './aperture';
import { Observable } from './observable';

/* Make ga typesafe, sortof */
declare global {
  interface Window {
    ga: Function;
  }
}

export class BrowserAperture extends Aperture {

  browser = true;
  _window: Window = window

  private with(_window: Window): Aperture {
    this._window = _window;
    return this;
  }

  get innerHeight(): number {
    return this._window.innerHeight;
  }

  get innerWidth(): number {
    return this._window.innerWidth;
  }

  get ga(): Function {
    return this._window.ga;
  }

  scrollTo(options?: ScrollToOptions): void {
    this._window.scrollTo(options);
  }

  open(url?: string, target?: string, features?: string, replace?: boolean): Aperture {
    return new BrowserAperture().with(this._window.open(url, target, features, replace));
  }

  set(key: string, value: any): void {
    this._window[key] = value;
  }

  now(): number {
    return this._window.performance.now();
  }

  create(target: any): Aperture {
    return new BrowserAperture().with(target);
  }

  observableWindowEvent(eventName: string): Observable<Event> {
    return Observable.fromEvent(window, eventName);
  }
}
