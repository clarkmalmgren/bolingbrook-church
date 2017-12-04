import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService, Analytics, Env }    from '../../../services';
import { ServiceGroup, ServiceSubtype }         from '../../templates/service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  guide: {
    name:  'Ask Me Anything Guide',
    description: `
      The Ask Me Anything team serve in the lobby at specific stations with clear signage that indicate they
      are the ones that can answer any question a guest may have about what’s going on that day. They are the
      people that provide guest the feeling “we are here for you.” They direct guests to restrooms, kid's
      experiences, Student Connect events, worship experiences, and any other event happening in-between
      services. They also give out any brochures, posters, or prints that guests will be need for the day.
    `
  },
  next: {
    name:  'Next Steps Team',
    description: `
      The Next Steps Team serve as our resource team. If a guest has a question concerning next steps, getting
      involved, or any question concerning the church as a whole, the Next Steps Team has the answers. They
      know everything there is to know about our church and  the processes involved in getting connected,
      therefore they require the highest level of commitment to our values, our mission, and our vision.
    `
  }
};

@Component({
  templateUrl: '../../templates/service-group.html',
  styleUrls: [ '../../templates/service-group.scss' ]
})
export class AskComponent extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router,
    analytics: Analytics
  ) {
    super(
      service,
      router,
      analytics,
      '/assets/serve/setup.jpg',
      'Ask Me Anything Team',
      null,
      [
        `
          Every Saturday someone walks through our doors who is looking for direction, and after experiencing
          our invite space they might be asking themselves, “What’s next?”  They need to know where the bathroom
          is? what’s happening for children? or what’s my next step in the journey towards my relationship in
          Jesus Christ.
        `,
        `
          Our What’s Next team is comprised of two different teams, one directs and gives out information
          happening that day, and the other connects the person to the next step in their journey whether
          that’s baptism or marriage care. Guests want to feel connected beyond the worship experience. Our
          What’s Next team plays a vital role in fulfilling that purpose; they are the bridge that connects
          our guests to all our available resources and next steps.
        `,
        `
          We'd love to tell you more about how you can become part of the team that keeps people connected to
          our Church . Every Saturday a new story is created about someone who took their first next step in
          their journey in becoming the person they always knew they could be.
        `,
        `
          Embrace the Madness and Register below to attend an upcoming orientation.
        `
      ],
      TYPES
    );
  }

}
