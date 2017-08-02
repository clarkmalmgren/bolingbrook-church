import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bc-hamburger',
  templateUrl: './hamburger.html',
  styleUrls: [ './hamburger.scss' ],
})
export class HamburgerComponent {

  @Output('activeChange')
  activeChange = new EventEmitter<boolean>(false);

  @Input('active')
  active: boolean = false;

  handleClick() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }
}

