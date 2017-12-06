import { ErrorHandler, Injectable } from '@angular/core';
import { Aperture }                 from './aperture';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private aperture: Aperture) { }

  handleError(error: any) {
    if (error.stack) {
      console.error(error.stack);
    }

    console.error('Error: ', error);

    this.aperture.ga('send', 'exception', {
      exDescription: error.message,
      exFatal: true
    });
  }
}
