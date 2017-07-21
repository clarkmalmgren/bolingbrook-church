import { Injectable }   from '@angular/core';
import { environment }  from '../../environments/environment';
const pkg: any = require('../../../package.json');

@Injectable()
export class Env {

  env = environment;
  nodePackage = pkg;

  get firebaseConfig() {
    return this.env.firebaseConfig;
  }

  get useBundledBackgroundVideo(): boolean {
    return this.env.useBundledBackgroundVideo;
  }

  get version(): string {
    return this.nodePackage.version;
  }
}
