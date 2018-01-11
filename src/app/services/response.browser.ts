import { Injectable }       from '@angular/core';
import { ResponseService }  from './response.service';

@Injectable()
export class BrowserResponseService extends ResponseService {

  setStatus(code: number, message?: string): void {
    console.error(`Setting HTTP Response Code [${code}: ${message}] not supported on browser`);
  }

}
