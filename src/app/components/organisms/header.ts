import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

class Link {
  constructor(
    public name: string,
    public icon: string,
    public url: string
  ) { }
}

@Component({
  selector: 'sda-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

  links = [
    new Link('Home', 'home', '/'),
    new Link('About Us', 'accessibility', '/about'),
    new Link('Giving', 'trending_up', '/giving'),
    new Link('Messages', 'school', '/messages'),
    new Link('Get Connected', 'power', '/get-connected'),
    new Link('Serve', 'people', '/serve'),
    new Link('Locations', 'public', '/locations'),
    new Link('Missions', 'textsms', '/missions'),
    new Link('Newsletter Sign-up', 'markunread_mailbox', 'newsletter'),
    new Link('Events', 'event', '/events'),
  ];

  opened = false;
}