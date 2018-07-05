import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bc-hamburger',
  templateUrl: './hamburger.html',
  styleUrls: [ './hamburger.scss' ],
})
export class HamburgerComponent {

  @Output()
  activeChange = new EventEmitter<boolean>(false);

  @Input()
  active: boolean = false;

  handleClick() {
    this.active = !this.active;
    this.activeChange.emit(this.active);
  }
}

