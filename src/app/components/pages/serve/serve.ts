import { Component }      from '@angular/core';
import { Env, Aperture }  from '../../../services';

@Component({
  templateUrl: './serve.html',
  styleUrls: [ './serve.scss' ]
})
export class ServeComponent {

  constructor(private aperture: Aperture) { }

  get mobile(): boolean {
    return this.aperture.innerWidth < 830;
  }
}
