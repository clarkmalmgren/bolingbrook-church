import { Component, OnInit }                from '@angular/core';
import { Storage, Series, MessagesService } from '../../services';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class Home implements OnInit {

  coverArtUrl: string;

  constructor(
    private storage: Storage,
    private messages: MessagesService
  ) {}

  ngOnInit() {
    this.messages.all()
      .flatMap((series) => {
        return this.storage.getUrl(series[0].image_ref);
      })
      .subscribe(url => { this.coverArtUrl = url; });
  }
}