import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService, Analytics }         from '../../../services';
import { ServiceGroup, ServiceSubtype }         from '../../templates/service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  audio: {
    name:  'Audio Team',
    description: `
      The Audio Team is responsible for the set-up, monitoring, and adjustment of all audio equipment. 
      Their role is to support the band, speaker, and all on-stage personnel as they lead or 
      communicate to the audience on Saturday. They focus on facilitating worship and communication, 
      focusing attention, and removing distractions.
    `
  },
  visual_and_lighting: {
    name:  'Visual & Lighting Team',
    description: `
      The Visual & Lighting Team is responsible for enhancing the worship service through the use 
      of visual tools and creating atmosphere through the use of lighting. Serving on the Visual Team 
      involves operation of Pro-Presenter, presenting on screen graphics or characters for Front of 
      House (ie: worship lyrics, Bible verses, etc.), and playback of pre-recorded videos. The 
      lighting team prepares and operates the equipment used to light both the stage and the 
      auditorium during our services.
    `
  },
  video: {
    name:  'Video Team',
    description: `
      The Video Team makes our live internet stream possible. This team prepares and operates the 
      equipment necessary to display live video and any graphics on our live stream. This team of 
      camera and graphics operators work together to broadcast our live in-house experience on 
      the world wide web. 
    `
  }
}

@Component({
  templateUrl: '../../templates/service-group.html',
  styleUrls: [ '../../templates/service-group.scss' ]
})
export class Media extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router,
    analytics: Analytics
  ) {
    super(
      service,
      router,
      analytics,
      '/assets/serve/production.jpg',
      'Media',
      undefined,
      [
        `
          The Media Team at Bolingbrook Church is a group that is passionate about delivering only 
          the very best for a God who deserves only the best. From the foundation of laying out miles 
          of cables, setting up of our HD cameras, to creating a distraction-free, worshipful 
          environment with the use of state-of-the-art audio and lighting. It is our goal to create 
          an atmosphere where one can interact with a God who is absolutely in love with us. If this 
          sounds like something you’d like to be a part of, embrace the madness and register today! 
          All our welcome to join! Training provided.
        `
      ],
      TYPES
    );
  }

}