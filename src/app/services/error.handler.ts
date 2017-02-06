import { ErrorHandler, Injectable } from '@angular/core';
import { Analytics }    from './analytics';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private analytics: Analytics) {

  }

  handleError(error: any) {
    console.log(error);
    this.analytics.exception(error.message);
  }
}