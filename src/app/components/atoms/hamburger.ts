import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hamburger',
  templateUrl: './hamburger.html',
  styleUrls: [ './hamburger.scss' ],
})
export class Hamburger {

  @Output('activeChange')
  change = new EventEmitter<boolean>(false);
  
  @Input('active')
  active: boolean = false;

  handleClick() {
    this.active = !this.active;
    this.change.emit(this.active);
  }
}

