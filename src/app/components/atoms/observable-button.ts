import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from '../../services';

@Component({
  selector: 'bc-observable-button',
  templateUrl: './observable-button.html',
  styleUrls: [ './observable-button.scss' ],
})
export class ObservableButtonComponent {

  @Input() disabled: boolean = false;
  @Output() bcOnClick = new EventEmitter<() => void>(false);
  loading: boolean = false;

  handleClick() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.bcOnClick.emit(() => {
      this.loading = false;
    });
  }
}

