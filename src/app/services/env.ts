import { Injectable }   from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class Env {

  env = environment;

  get firebaseConfig() {
    return this.env.firebaseConfig;
  }
}
