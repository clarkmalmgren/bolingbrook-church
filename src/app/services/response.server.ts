import { Injectable, Inject }   from '@angular/core';
import { RESPONSE }             from '@nguniversal/express-engine/tokens'
import * as express             from 'express';
import { ResponseService }      from './response.service';

@Injectable()
export class ServerResponseService extends ResponseService {

  static factory(response: express.Response): ServerResponseService {
    return new ServerResponseService(response);
  }

  constructor( @Inject(RESPONSE) private response: express.Response ) {
    super();
  }

  setStatus(code: number, message?: string): void {
    this.response.sendStatus(code, message);
  }

}
