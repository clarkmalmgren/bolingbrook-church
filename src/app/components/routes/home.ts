import { Component, OnInit }  from '@angular/core';
import { Storage }            from '../../services';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class Home implements OnInit {

  coverArtUrl: string;

  constructor(private storage: Storage) {}

  ngOnInit() {
    this.storage.getUrl('series/push.png')
      .subscribe(url => { this.coverArtUrl = url; });
  }
}