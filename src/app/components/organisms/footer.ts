import { Component } from '@angular/core';

class Social {
  constructor(public url: string, public img: string) {}
}

@Component({
  selector: 'sda-footer',
  templateUrl: './footer.html',
  styleUrls: [ './footer.scss' ]
})
export class Footer {
  socials = [
    new Social('http://www.twitter.com/bolingbrooksda', '/assets/social/twitter_logo.png'),
    new Social('http://instagram.com/bolingbrookchurch', '/assets/social/instagram_logo.png'),
    new Social('https://www.facebook.com/bolingbrooksda', '/assets/social/facebook_logo.png'),
    new Social('https://vimeo.com/bolingbrookchurch', '/assets/social/vimeo_logo.png'),
  ]
}