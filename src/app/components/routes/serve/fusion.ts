import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService }                    from '../../../services';
import { ServiceGroup, ServiceSubtype }         from './service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  greeter: {
    name:  'Greeter',
    description: `
      These volunteers serve our guests at the doors, in the hallways, and in the auditoriums by making them feel valued with a
      sincere greeting, a genuine smile, a friendly presence, a fond farewell, and by providing general assistance during
      their visit.
    `
  },
  usher: {
    name:  'Usher',
    description: `
      Our usher teams are who help find seating and make sure all who come can enjoy our program and not have to worry about if
      or where they will sit.
    `
  },
  fit: {
    name:  'F.I.T.',
    description: `
      Our First Impressions Team (F.I.T) proactively provide a warm welcome, clear directions, and safe paths for guests entering
      and exiting our Romeoville campus. Our F.I.T. is equal parts hotel concierge and security.
    `
  },
  cafe: {
    name:  'Cafe',
    description: `
      Come join our team who brings smiles to everyone. Nothing hits the spot on a warm day like a good smoothy or even some warm
      apple cider on a cool day! This team makes that all possible.
    `
  }
}

@Component({
  templateUrl: './service-group.html',
  styleUrls: [ './service-group.scss' ]
})
export class Fusion extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router
  ) {
    super(
      service,
      router,
      '/assets/serve/fusion.jpg',
      'Fusion Team Volunteers',
      'Every Saturday is the first Saturday for someone at Bolingbrook. Our Fusion teams are who make that first experience special.',
      `
        Our Fusion team works hard to create an environment where all guests feel safe and comfortable. Our teams have fun, care
        for guests, share community with your team, and play a significant role in helping someone have a remarkable experience.
        We are one large team that can be seen helping our guests in several areas.
      `,
      TYPES
    );
  }

}