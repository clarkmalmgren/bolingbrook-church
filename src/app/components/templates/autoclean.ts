import { OnDestroy }    from '@angular/core';
import { Subscription } from 'app/services';

export abstract class Autoclean implements OnDestroy {

  subscriptions: Subscription[] = [];

  autoclean(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
