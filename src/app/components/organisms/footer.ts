import { Component } from '@angular/core';
import { Env }       from '../../services';

class Social {
  constructor(public url: string, public img: string) {}
}

@Component({
  selector: 'bc-footer',
  templateUrl: './footer.html',
  styleUrls: [ './footer.scss' ]
})
export class FooterComponent {
  constructor(
    private env: Env
  ) {}

  get version(): string {
    return this.env.version;
  }
}
