import { Component }                            from '@angular/core';
import { Router }                               from '@angular/router';
import { ConnectionService, Analytics }         from '../../../services';
import { ServiceGroup, ServiceSubtype }         from '../../templates/service-group';

const TYPES: { [key: string]: ServiceSubtype } = {
  growth: {
    name:  'Growth Groups for Kids',
    description: `
      Every Saturday, our growth group teachers nurture, foster, and encourage in their specific 
      age-appropriate classes where our kids learn that God cares for them in the same way he 
      cared for those who they encounter in their bible stories. Teaching like Jesus did, they 
      use engaging object lessons to bring the bible to life for our kids. 
    `
  },
  explorer: {
    name:  'Explorer Groups',
    description: `
      Our Explorer groups are part of Adventurer Club, an international scout-like church-based 
      program created by the Seventh Day Adventist Church. The mission of the Adventurer Club 
      ministry is to serve an intercultural community of children from pre-kindergarten through 
      fourth grade and their parents or guardians and assist Adventurer families in growing into 
      followers of Jesus. At Bolingbrook Church, our explorer groups help each child grow 
      spiritually, intellectually, emotionally, socially, and physically. Our staff are energetic, 
      Jesus-Centered, certified teachers who plan exciting activities, events, trips and service 
      projects year-round for our Explorers and their families. We ensure that all our volunteers 
      become certified in order to join the fun! 
    `
  },
  worship: {
    name:  "Kid's Worship",
    description: `
      Every 2nd, 3rd and 4th Saturday, our kids are invited to encounter Jesus in their own 
      age-appropriate worship service for kids ages 5-10. The worship services are designed to 
      give our young disciples a clear picture of who God is and how they can use the Bible, 
      Prayer and Song to draw closer to Him so they can live victoriously in this
      chaotic-sin-stained world until He comes again. Every Kid’s worship volunteer work together, 
      have fun, and demonstrate the incredible love of Jesus to each child to provide a meaningful 
      worship experience for our kids.
    `
  }
}

@Component({
  templateUrl: '../../templates/service-group.html',
  styleUrls: [ '../../templates/service-group.scss' ]
})
export class Children extends ServiceGroup {

  constructor(
    service: ConnectionService,
    router: Router,
    analytics: Analytics
  ) {
    super(
      service,
      router,
      analytics,
      '/assets/march-madness/banners/CHILDRENS.jpg',
      "Children's Ministries",
      undefined,
      [
        `
          Bolingbrook Church Children’s Ministries is called Discipletown. Discipletown is all about 
          helping kids grow to be like Jesus. From infanthood to fifth grade; Discipletown seeks to 
          create spaces where kids are invited to encounter a loving Jesus, connect them with one 
          another in a fun and loving discipling environment, and then help them learn and grow to 
          be like Jesus in small group environments.
        `
      ],
      TYPES,
      [
        `
          We want our Discipletown volunteers to serve where they are most comfortable, where they 
          are gifted and with an age group they enjoy. We work hard to support our dedicated and 
          committed volunteers as they work to help our Discipletown Kids become loving Christ-like 
          disciples, who are equipped to serve their church and community and to live victoriously 
          in this world until Jesus comes again.
        `,`
          Volunteers 18 or older must complete an application, submit to an interview, provide 
          information for a background check, and pass an on-line training course that train them 
          to protect children from abuse. 
        `,`
          We would love you to join our team, and embrace the madness that keeps our Saturdays 
          going! Every Saturday a new story is created where one of our kids fall in love with 
          Jesus and commit to live their lives for him. Be part of the story! 
        `,`
          Please fill out the application linked below to start the steps to joining the team.
        `
      ],
      'https://form.jotform.com/70576180466158'
    );
  }

}