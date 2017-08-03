import { ErrorHandler, Injectable } from '@angular/core';

/* Make ga typesafe, sortof */
declare var ga: Function;

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any) {
    console.error(error.stack);
    console.error('Error: ', error);

    ga('send', 'exception', {
      exDescription: error.message
    });
  }
}
