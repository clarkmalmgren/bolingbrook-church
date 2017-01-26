import { Component }                                        from '@angular/core';
import { Router }                                           from '@angular/router';
import { ConnectionRequest, ConnectionService, Observable } from '../../services';
import { STATES }                                           from './states';

interface EmergencyContact {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;
  zipcode: number;
}

class MissionRequest extends ConnectionRequest {
  tshirt: string;
  vegetarian: string;
  couples: string;
  spouse: string;
  emergency: EmergencyContact = {} as EmergencyContact;


  constructor() {
    super('mission');
  }
}

@Component({
  templateUrl: './missions.html',
  styleUrls: [ './missions.scss' ]
})
export class Missions {
  /* Submission Models */
  interests: { [key: string]: boolean } = {};
  request: MissionRequest = new MissionRequest();

  types: { [key: string]: string } = {
    medical:    'Medical Clinic (Physician, Nurse, PT, Optometrist, Mental Health Personnel, etc.)',
    dental:     'Dental Clinic (Dentist, Dental Hygienist)',
    evangelism: 'Evangelism (Bible Worker, Week of Prayer, Musician)',
    vbs:        'Vacation Bible School',
    marketing:  'Marketing (Social Media, Photography, Videography)'
  };

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