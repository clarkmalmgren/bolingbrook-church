import { Component }                                        from '@angular/core';
import { Router }                                           from '@angular/router';
import { ConnectionRequest, ConnectionService, Observable } from '../../services';
import { STATES }                                           from './states';

@Component({
  templateUrl: './connect.html',
  styleUrls: [ './connect.scss' ]
})
export class Connect {
  /* Submission Models */
  interests: { [key: string]: boolean } = {};
  request: ConnectionRequest = new ConnectionRequest('connect');

  types: { [key: string]: string } = {
    jesus   : "Learn more about following Jesus",
    prek    : "Learn more about our PreK-8 School",
    baptism : "Be Baptized",
    home    : "Make Bolingbrook my home church"
  }

  /* Required for ngFor to work */
  typeKeys: string[];
  states = STATES;

  constructor(
    private service: ConnectionService,
    private router: Router
  ) {
    this.typeKeys = Object.keys(this.types).sort();
  }

  submit(): Observable<any> {
    this.request.interests = Object.keys(this.interests).map(i => this.types[i]);
    let o = this.service.submit(this.request);

    o.subscribe(() => {
      this.router.navigate([ '/thank-you' ]);
    });

    return o;
  }
}