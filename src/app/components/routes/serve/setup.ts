import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService }                    from '../../../services';
import { ServiceGroup, ServiceSubtype }         from './service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  fellowship: {
    name:  'Fellowship',
    description: `
      Those who come for the chance to simply be in the presence of other who want to enjoy the company
      of friendly faces and people while enjoying some light snacks before joining in a short prayer and
      a few song can enjoy this time. Bring a friend! Just be part of The Set Up experience and soak in
      all that it has to offer.
    `
  },
  create: {
    name:  'Create',
    description: `
      Those who come not only for the sake of the opportunity to fellowship but who want to see and be
      a part of everything that goes into making the Bolingbrook experience a reality. The Set Up-Create
      groups join in on the set-up process that takes place right after our short praise and worship.
    `
  },
  lead: {
    name:  'Lead',
    description: `
      For our entire Set Up experience to happen it takes a handful of people who are willing to go the
      extra mile to learn some of the more detailed aspects of our setup and then lead others who are also
      willing to give of their time to be a part of something bigger.
    `
  }
}

@Component({
  templateUrl: './service-group.html',
  styleUrls: [ './service-group.scss' ]
})
export class Setup extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router
  ) {
    super(
      service,
      router,
      '/assets/serve/setup.jpg',
      'The Setup',
      `
        The Setup is both an experience to enjoy an increased sense of fellowship as well as an
        opportunity to be involved in and see behind the scenes of what it takes to make the
        Bolingbrook Church experience happen each Saturday.
      `,
      `
        Each Saturday it takes many people to make everything possible that happens at Bolingbrook
        Church. groups of outgoing people come together to fellowship and join in an environment
        of praise and worship while enjoying refreshments prior to working briefly to prepare our
        main service for that day. There are several ways in which people can be involved each week.
      `,
      TYPES
    );
  }

}