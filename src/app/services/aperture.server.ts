import { Aperture } from './aperture';

export class ServerAperture extends Aperture {

  browser = false;
  innerWidth = 1366;
  innerHeight = 768;

  defaultGoogleAnalytics(method?: string, type?: string, data?: Object): void {
    // console.log(`ga(${method}, ${type}, ${data})`);
  }

  get ga(): Function {
    return this.defaultGoogleAnalytics
  }

  scrollTo(options?: ScrollToOptions): void { }

  open(url?: string, target?: string, features?: string, replace?: boolean): Aperture {
    return this;
  }

  set(key: string, value: any): void {
    global[key] = value;
  }

  now(): number {
    return new Date().getTime();
  }

  create(target: any): Aperture {
    return this;
  }
}
