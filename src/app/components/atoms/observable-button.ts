

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from '../../services';

@Component({
  selector: 'observable-button',
  templateUrl: './observable-button.html',
  styleUrls: [ './observable-button.scss' ],
})
export class ObservableButton {

  @Input('disabled') isDisabled: boolean = false;
  @Output('sda-click') click = new EventEmitter<() => void>(false);
  loading: boolean = false;

  handleClick() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.click.emit(() => {
      this.loading = false;
    });
  }
}

