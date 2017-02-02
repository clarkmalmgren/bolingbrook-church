import { Injectable }   from '@angular/core';
import { environment }  from '../../environments/environment';
const pkg: any = require('../../../package.json');

@Injectable()
export class Env {

  env = environment;

  get firebaseConfig() {
    return this.env.firebaseConfig;
  }

  get useBundledBackgroundVideo() {
    return this.env.useBundledBackgroundVideo;
  }

  get version() {
    return pkg.version;
  }
}
