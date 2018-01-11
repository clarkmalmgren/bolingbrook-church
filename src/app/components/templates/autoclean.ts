import { OnDestroy }    from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export abstract class Autoclean implements OnDestroy {

  subscriptions: Subscription[] = [];

  autoclean(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

function autoclean(this: Subscription, cleaner: Autoclean): Subscription {
  cleaner.autoclean(this);
  return this;
}

/* tslint:disable */
declare module 'rxjs/Subscription' {
  interface Subscription {
    autoclean: typeof autoclean;
  }
}

Subscription.prototype.autoclean = autoclean;
