import { Component, OnInit }  from '@angular/core';
import { FirebaseService }    from '../../services';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class Home implements OnInit {

  coverArtUrl: string;

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {
    this.fbs.getStorageUrl('series/push.png')
      .subscribe(url => { this.coverArtUrl = url; });
  }
}