import { Component, OnInit }                          from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Aperture }                                   from '../../services'

@Component({
  selector: 'bc-popup',
  templateUrl: './popup.html',
  styleUrls: [ './popup.scss' ],
  animations: [
    trigger('popupState', [
      state('shown',  style({ left: '0' })),
      state('hidden', style({ left: '100%', display: 'none' })),
      transition('* => *', animate('200ms ease-in-out'))
    ])
  ]
})
export class PopupComponent implements OnInit {

  popupState: string = 'shown';

  constructor(private aperture: Aperture) {}

  ngOnInit() {
    if (this.aperture.browser) {
      setTimeout(() => this.popupState = 'hidden', 10000);
    }
  }
}
