import { Router }                                                       from '@angular/router';
import { ConnectionRequest, ConnectionService, Observable, Analytics }  from '../../../services';


export interface ServiceSubtype {
  name: string,
  description: string
}

export abstract class ServiceGroup {
  /* Submission Models */
  interests: { [key: string]: boolean } = {};
  request: ConnectionRequest = new ConnectionRequest('serve');

  /* Required for ngFor to work */
  typeKeys: string[];
  typesArray: ServiceSubtype[];

  constructor(
    private service: ConnectionService,
    private router: Router,
    private analytics: Analytics,

    public hero_ref: string,
    public title: string,
    public subtitle: string,
    public details: string,
    public types: { [key: string]: ServiceSubtype }
  ) {
    this.typeKeys = Object.keys(types).sort();
    this.typesArray = this.typeKeys.map(k => types[k]);
  }

  submit(): Observable<any> {
    this.request.interests = Object.keys(this.interests).map(i => this.types[i].name);
    let o = this.service.submit(this.request)
      .flatMap(() => { return this.analytics.event('form', 'submit', 'title'); })
      .catch((err) => { return this.analytics.exception(err); });

    o.subscribe(() => {
      this.router.navigate([ '/thank-you' ]);
    });

    return o;
  }
}