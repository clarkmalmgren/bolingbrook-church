import { Component, OnInit }                from '@angular/core';
import { Storage, Series, MessagesService } from '../../services';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class Home implements OnInit {

  coverArtUrl: string;
  series: Series;

  constructor(
    private storage: Storage,
    private messages: MessagesService
  ) {}

  ngOnInit() {
    this.messages.latest()
      .flatMap((series) => {
        this.series = series;
        return this.storage.getUrl(series.image_ref);
      })
      .subscribe(url => { this.coverArtUrl = url; });
  }

  get link(): string[] {
    return this.series ? [ 'messages', this.series.id ] : [];
  }
}