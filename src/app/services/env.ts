import { Injectable }   from '@angular/core';
import { environment }  from '../../environments/environment';
const { version: appVersion } = require('../../../package.json')

@Injectable()
export class Env {

  env = environment;
  version: string = appVersion

  get firebaseConfig() {
    return this.env.firebaseConfig;
  }

  get useBundledBackgroundVideo(): boolean {
    return this.env.useBundledBackgroundVideo;
  }
}
