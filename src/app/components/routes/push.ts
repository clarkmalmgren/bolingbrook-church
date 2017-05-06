import { Component }    from '@angular/core';
import { Analytics }    from '../../services';

@Component({
  templateUrl: './push.html',
  styleUrls: [ './push.scss' ]
})
export class Push {

  constructor(
    private analytics: Analytics
  ) {}

  takeSurvey(): boolean {
    this.analytics.event('nav', 'leave', 'push_survey')
      .subscribe(() => {
        location.href = 'https://www.surveymonkey.com/r/JSVDZBS';
      });
    return false;
  }
}