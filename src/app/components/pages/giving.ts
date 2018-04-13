import { Component, OnInit }   from '@angular/core';
import { Analytics, Aperture } from '../../services';

@Component({
  templateUrl: './giving.html',
  styleUrls: [ './giving.scss' ]
})
export class GivingComponent implements OnInit {

  envelopeShown: boolean = false;
  _location: Location

  constructor(
    private analytics: Analytics,
    private aperture: Aperture
  ) {}

  ngOnInit() {
    this._location = this.aperture.browser ? window.location : {} as Location
  }

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
