import { OnInit, Component }  from '@angular/core';
import { Router }             from '@angular/router';
import { Secured }            from './secured';

import {
  FirebaseService,
  Observable,
  Pager,
  SeriesImageForm,
  SeriesImageService,
  Sermon,
  SermonService,
} from '../../../services';

@Component({
  templateUrl: './sermons.html',
  styleUrls: [ './sermons.scss' ]
})
export class SermonsComponent extends Secured implements OnInit {

  sermons: Sermon[];
  images: SeriesImageForm[];
  pager: Pager<Sermon>;

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: SermonService,
    private imageService: SeriesImageService
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    this.secure()
      .subscribe((authd) => {
        if (authd) {
          this.update();
        }
      });
  }

  update(): void {
    this.pager = this.service.page();
    this.pager
      .observe()
      .subscribe(sermons => {
        this.sermons = sermons;
      });

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
    const sermon = {
      date: date,
      series: '',
      speaker: ''
    } as Sermon;

    this.service
      .saveSermon(sermon)
      .subscribe(() => this.update());
  }

  saveSermon(sermon: Sermon): void {
    this.service
      .saveSermon(sermon);
  }

}
