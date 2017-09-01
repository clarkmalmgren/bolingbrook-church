import { Component }    from '@angular/core';
import { Analytics }    from '../../services';

@Component({
  templateUrl: './giving.html',
  styleUrls: [ './giving.scss' ]
})
export class GivingComponent {

  envelopeShown: boolean = false;
  _location: Location = location;

  constructor(
    private analytics: Analytics
  ) {}

  give(type: string): boolean {
    this.analytics.event('nav', 'leave', 'donate')
      .subscribe(() => {
        this._location.href = (type === 'easy') ?
                          'http://www.easytithe.com/dl/?uid=boli301244t7' :
                          'https://www.adventistgiving.org/?OrgID=ANF4BV';
      });
    return false;
  }

  showEnvelope() {
    this.analytics.event('overlay', 'show', 'giving envelope');
    this.envelopeShown = true;
    return false;
  }

  hideEnvelope() {
    this.envelopeShown = false;
  }

}
