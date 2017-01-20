import { Component }                                        from '@angular/core';
import { Router }                                           from '@angular/router';
import { ConnectionRequest, ConnectionService, Observable } from '../../../services';

const INTEREST_MAP = {
  greeter: 'Greeter',
  usher: 'Usher',
  fit: 'F.I.T.',
  cafe: 'Cafe'
}

@Component({
  templateUrl: './fusion.html',
  styleUrls: [ './fusion.scss' ]
})
export class Fusion {

  interests: { [key: string]: boolean } = {};

  request: ConnectionRequest = new ConnectionRequest('serve');

  constructor(
    private service: ConnectionService,
    private router: Router
  ) {}

  submit(): Observable<any> {
    this.request.interests = Object.keys(this.interests).map(i => INTEREST_MAP[i]);
    let o = this.service.submit(this.request);

    o.subscribe(() => {
      this.router.navigate([ '/thank-you' ]);
    });

    return o;
  }
}