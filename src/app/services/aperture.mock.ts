import { Aperture }   from './aperture';
import { Observable } from './observable';

export class MockAperture extends Aperture {

  browser = true;

  constructor(
    private _ga: Function = () => { }
  ) {
    super();
  }

  scrollTo(options?: ScrollToOptions): void {
    throw new Error('Method not implemented.');
  }

  open(url?: string, target?: string, features?: string, replace?: boolean): Aperture {
    throw new Error('Method not implemented.');
  }

  set(key: string, value: any): void {
    throw new Error('Method not implemented.');
  }

  now(): number {
    return performance.now()
  }

  create(target: any): Aperture {
    throw new Error('Method not implemented.');
  }

  observableWindowEvent(eventName: string): Observable<Event> {
    throw new Error('Method not implemented.');
  }

  get ga(): Function {
    return this._ga;
  }
}
