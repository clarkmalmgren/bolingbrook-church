import { OnInit, Component }  from '@angular/core';
import { Router }             from '@angular/router';
import { Secured }            from './secured';
import * as moment            from 'moment'

import {
  FirebaseService,
  Observable,
  PaginatedPager,
  SeriesImageForm,
  SeriesImageService,
  Sermon,
  SermonService,
  WorshipService,
  YoutubeApiService
} from '../../../services';

@Component({
  templateUrl: './sermons.html',
  styleUrls: [ './sermons.scss' ]
})
export class SermonsComponent extends Secured implements OnInit {

  sermons: Sermon[];
  images: SeriesImageForm[];
  pager: PaginatedPager<Sermon>;
  newSermonDate: string;

  constructor(
    router: Router,
    firebase: FirebaseService,
    private youtubeApi: YoutubeApiService,
    private service: SermonService,
    private imageService: SeriesImageService
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    const subscription =
      this.secure()
        .subscribe((authd) => {
          if (authd) {
            this.update();
          }
        })

    this.autoclean(subscription)
  }

  update(): void {
    if (this.pager) {
      this.pager.close();
    }

    this.pager = this.service.paginated();
    const subscription = this.pager.observe().subscribe(sermons => { this.sermons = sermons })
    this.autoclean(subscription)

    this.imageService.listSeries()
      .subscribe(images => {
        this.images = images;
      });
  }

  removeSermon(date: string): void {
    this.service
      .deleteSermon(date)
      .subscribe(() => this.update());
  }

  addSermon(date: string): void {
    const sermon = new Sermon(date, '', '', '', '', '', [
      new WorshipService('10:30:00', 'Morning', ''),
      new WorshipService('12:30:00', 'Afternoon', ''),
    ]);

    this.service
      .saveSermon(sermon)
      .subscribe(() => this.update());
  }

  createVideo(sermon: Sermon, ws: WorshipService): void {
    // just double check that you are still logged in...
    if (this.youtubeApi.login()) {
      const start = moment.tz(`${sermon.date}T${ws.start}`, 'America/Chicago')
      const title = `${sermon.title} (${start.format('MMMM D, YYYY')} - ${ws.identifier})`

      this.youtubeApi
        .createEvent(title, sermon.description, start)
        .subscribe(id => ws.youtube = id)
    }
  }

  saveSermon(sermon: Sermon): void {
    this.service
      .saveSermon(sermon)
      .subscribe(() => this.update());
  }

}
