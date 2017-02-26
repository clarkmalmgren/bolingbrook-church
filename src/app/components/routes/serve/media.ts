import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService, Analytics }         from '../../../services';
import { ServiceGroup, ServiceSubtype }         from './service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  website: {
    name: 'Website Team',
    description: `
      Our website serves as a welcome center for guests and people who want to find out more about
      our church and as an information hub for our current members to further their growth and development
      in their walk with Christ. The website team is responsible for keeping our website current and up to
      date as well as constantly finding ways to innovate and use technology to reach those God misses the most.
    `
  },
  social: {
    name: 'Social Media Team',
    description: `
      Social Media has become one of the most powerful forms of media in our society today. It is
      instant, interactive, and influential. Our social media team wants to share the Love of Jesus Christ
      through facebook, twitter, instagram, & periscope to reach those God misses the most.
    `
  },
  blog: {
    name: 'Blog',
    description: `
      Great ideas start with a simple conversation. In our digital age, blogging has become a popular
      tool to share ones’ thoughts and opinions. One of the most beautiful things God has given us is a
      free mind where we can process information, form opinions, and create a plan of action. Our blog
      team follows our sermon series and seeks to create a space where conversations can occur.
    `
  }
}

@Component({
  templateUrl: './service-group.html',
  styleUrls: [ './service-group.scss' ]
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
      '/assets/serve/media.jpg',
      'Media Team',
      undefined,
      `
        The Media Team at Bolingbrook Church is committed to creating spaces for the people God misses
        the most through the use of technology. To constantly innovate, create new tools and platforms,
        and to provide resources for people to learn & grow in their relationship with God. We are
        constantly seeking people who are eager to learn and eager to share new ideas! Sign up today
        and join the team!
      `,
      TYPES
    );
  }

}