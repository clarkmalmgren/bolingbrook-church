import { Component, OnInit }                          from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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

  popupState: string = 'hidden';

  ngOnInit() {
    setTimeout(() => this.popupState = 'shown', 1000);
    setTimeout(() => this.popupState = 'hidden', 10000);
  }
}
