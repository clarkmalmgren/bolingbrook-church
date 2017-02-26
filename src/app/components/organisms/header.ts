import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

class Link {
  constructor(
    public name: string,
    public url: string,
    public icon: string
  ) { }
}

@Component({
  selector: 'sda-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

  links = [
    new Link('Home',                      '/',                        'home'),
    new Link('About Us',                  '/about',                   'accessibility'),
    new Link('Giving',                    '/giving',                  'trending_up'),
    new Link('Messages',                  '/messages',                'school'),
    new Link('Get Connected',             '/connect',                 'power'),
    new Link('Serve',                     '/serve',                   'people'),
    new Link('Locations',                 '/locations',               'public'),
    new Link('Missions',                  '/missions',                'textsms'),
    new Link('Newsletter Sign-up',        '/newsletter',              'markunread_mailbox'),
    new Link('Friends & Family Sabbath',  '/friends-family-sabbath',  'directions_walk'),
    new Link('Events',                    '/events',                  'event'),
  ];

  opened = false;
}