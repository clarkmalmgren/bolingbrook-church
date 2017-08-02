import { Component }    from '@angular/core';
import { Analytics }    from '../../services';

@Component({
  templateUrl: './about.html'
})
export class AboutComponent {

  constructor(
    private analytics: Analytics
  ) {}

  believe(): boolean {
    this.analytics.event('nav', 'leave', 'beliefs')
      .subscribe(() => {
        location.href = 'http://www.adventist.org/beliefs/';
      });
    return false;
  }
}
