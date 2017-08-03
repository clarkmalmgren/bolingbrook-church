import { Component }    from '@angular/core';
import { Env }          from '../../../services';

@Component({
  templateUrl: './serve.html',
  styleUrls: [ './serve.scss' ]
})
export class ServeComponent {

  get mobile(): boolean {
    return window.innerWidth < 830;
  }
}
