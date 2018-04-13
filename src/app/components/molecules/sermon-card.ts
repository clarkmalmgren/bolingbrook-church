import { Component, Input, OnInit }   from '@angular/core';
import { SafeStyle }                  from '@angular/platform-browser';
import { Sermon, SeriesImageService } from '../../services';


@Component({
  selector: 'bc-sermon-card',
  templateUrl: './sermon-card.html',
  styleUrls: [ './sermon-card.scss' ]
})
export class SermonCardComponent {

  @Input()
  sermon: Sermon;

  constructor(
    private service: SeriesImageService
  ) {}

  get image(): string {
    const youtube = this.sermon.services[0].youtube
    return `https://i.ytimg.com/vi/${youtube}/hqdefault.jpg`;
  }

  get route(): string[] {
    return [ '/sermons', this.sermon.date];
  }

}
