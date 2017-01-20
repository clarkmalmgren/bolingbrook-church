import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService }                    from '../../../services';
import { ServiceGroup, ServiceSubtype }         from './service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  visual: {
    name:  'Visual Team',
    description: `
      The Visual Team is responsible for enhancing the worship service through the use of visual tools.
      Serving on the Visual Team involves operation of Pro-Presenter, presenting on screen graphics
      for Front of House and Broadcast, and playback of pre-recorded videos.
    `
  },
  audio: {
    name:  'Audio Team',
    description: `
      The Audio Team is responsible for the set-up, monitoring, and adjustment of all audio equipment.
      Their role is to support the band, speaker, and all on-stage personnel as they lead or
      communicate to the audience on Saturday. They focus on facilitating worship and communication,
      focusing attention, and removing distractions.
    `
  },
  lighting: {
    name:  'Lighting Team',
    description: `
      The Lighting Team prepares and operates the equipment used to light both the stage and the
      auditorium on Sundays. They focus on illuminating properly, creating atmosphere, and focusing
      attention.
    `
  }
}

@Component({
  templateUrl: './service-group.html',
  styleUrls: [ './service-group.scss' ]
})
export class Production extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router
  ) {
    super(
      service,
      router,
      '/assets/serve/production.jpg',
      'Production Team',
      undefined,
      `
        The Production Team at Bolingbrook Church is a group that is passionate about delivering only
        the very best for a God who deserves only the best. From the foundation of laying out miles of
        cables, to the setting up of our HD cameras, and to creating a distraction-free, worshipful
        environment with the use of state-of-the-art audio and lighting. It is our goal to create an
        atmosphere where one can interact with a God who is absolutely in love with them. If this sounds
        like something you’d like to be a part of, sign up today! All our welcome to join! Training provided.
      `,
      TYPES
    );
  }

}