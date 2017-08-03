import { OnInit, Component }  from '@angular/core';
import { Router }             from '@angular/router';
import { Secured }            from './secured';

import {
  FirebaseService,
  Observable,
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

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: SermonService,
    private imageService: SeriesImageService
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    this.secure().subscribe(() => {
      this.service.all()
        .subscribe(sermons => {
          this.sermons = sermons;
        });

      this.imageService.listSeries()
        .subscribe(images => {
          this.images = images;
        });
    });
  }

  removeSermon(date: string): void {
    this.service.deleteSermon(date);
  }

  addSermon(date: string): void {
    this.sermons.push({} as Sermon);
  }

  saveSermon(sermon: Sermon): void {
    this.service.saveSermon(sermon);
  }

}
