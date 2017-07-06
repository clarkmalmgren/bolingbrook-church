import { Component, Input, HostListener, OnInit } from '@angular/core';
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
export class Header implements OnInit {

  _window: Window = window;

  @Input()
  video: any;

  @Input()
  image: string;

  @Input()
  shade: number = 0.0;

  @Input()
  relativeHeight: number = 1.0;

  @Input()
  absoluteHeight: number = 0;

  mobile: boolean = false;
  opened: boolean = false;
  assetHeight: string = 'auto';

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


  ngOnInit() {
    this.processScreenSize(this._window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.processScreenSize(event.target);
  }

  processScreenSize(window: Window) {
    this.mobile = (window.innerWidth < 450);

    if (this.video || this.image) {
      let px = window.innerHeight * this.relativeHeight + this.absoluteHeight;
      this.assetHeight = `${px}px`;
    } else {
      this.assetHeight = 'auto';
    } 
  }
}