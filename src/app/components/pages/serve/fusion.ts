import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService, Analytics, Env }    from '../../../services';
import { ServiceGroup, ServiceSubtype }         from '../../templates/service-group';
const TYPES: { [key: string]: ServiceSubtype } = {
  usher: {
    name:  'Usher',
    description: `
      Ushers help guests make it from the streets to their seats without the burden of trying to find a
      place for themselves and their friends or family. They provide the "we've got your back" for all
      our guests. Guests never want to feel like they are out of place, ushers provide the feeling that
      “we’ve been preparing just for you.
    `
  },
  greeter: {
    name:  'Greeter',
    description: `
      Greeters welcome each guest "home" for the day with a grand smile & embracing attitude. They embrace
      each guest with a friendly & inviting attitude that lets him or her know "we've been waiting for you."
      Greeters are driven to make others feel the love that Jesus has for them the minute they walk through our doors.
    `
  }
}

@Component({
  templateUrl: '../../templates/service-group.html',
  styleUrls: [ '../../templates/service-group.scss' ]
})
export class Fusion extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router,
    analytics: Analytics,
    env: Env
  ) {
    super(
      service,
      router,
      analytics,
      '/assets/serve/fusion.jpg',
      'FUSION',
      null,
      [
        `
          Every Saturday people from all walks of life enter our invite space when they arrive on our campus.
          From the songs we sing to the messages we preach, we seek to create an environment where the people
          God misses the most are invited to encounter a loving and awesome God. Our fusion team is a vital and
          integral part of fulfilling that purpose, from greeting someone at our doors, to seating someone in
          our auditorium; Our fusion team works hard to create a friendly and embracing experience for every 
          guest who arrives on our campus. 
        `,
        `
          We begin interacting with guests the minute they approach our doors to when they are seated in our
          auditorium.
        `,
        `
          Our volunteers can expect to have fun, share connection with a team, and play a significant role in
          creating a welcoming and inviting space for all the people God will gift us with each Saturday who
          walk through our doors.
        `,
        `
          We'd love to tell you more about how you can become part of the team that keeps Saturdays going.
          Every Saturday a new story is created about someone who was invited to encounter God in a fresh new
          way, and as a result started a journey in becoming the person they always knew they could be. 
        `,
        `
          Embrace the Madness and Register below to attend an upcoming orientation.
        `
      ],
      TYPES
    );
  }

}