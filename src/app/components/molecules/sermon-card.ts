import { Component, Input, OnInit }   from '@angular/core';
import { SafeStyle }                  from '@angular/platform-browser';
import { Sermon, SeriesImageService } from '../../services';


@Component({
  selector: 'sermon-card',
  templateUrl: './sermon-card.html',
  styleUrls: [ './sermon-card.scss' ]
})
export class SermonCard implements OnInit {

  @Input()
  sermon: Sermon;

  icon: SafeStyle;

  constructor(
    private service: SeriesImageService
  ) {}

  ngOnInit() {
    if (this.sermon.image) {
      this.service.getSeriesImageStyle(this.sermon.image)
        .subscribe(style => { this.icon = style });
    }
  }
  
  get image(): string {
    return `https://i.ytimg.com/vi/${this.sermon.youtube}/hqdefault.jpg`
  }

  get route(): string[] {
    return [ '/sermons', this.sermon.date];
  }

}