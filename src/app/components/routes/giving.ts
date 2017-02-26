import { Component }    from '@angular/core';
import { Analytics }    from '../../services';

@Component({
  templateUrl: './giving.html',
  styleUrls: [ './giving.scss' ]
})
export class Giving {

  constructor(
    private analytics: Analytics
  ) {}

  give(): boolean {
    this.analytics.event('nav', 'leave', 'donate')
      .subscribe(() => {
        location.href = 'http://www.easytithe.com/dl/?uid=boli301244t7';
      });
    return false;
  }
}