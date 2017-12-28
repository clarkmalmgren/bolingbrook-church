import { OnInit, Component }                                                from '@angular/core';
import { Router }                                                           from '@angular/router';
import { FirebaseService, SeriesImageForm, SeriesImageService, Observable } from '../../../services';
import { Secured }                                                          from './secured';

@Component({
  templateUrl: './series.html',
  styleUrls: [ './series.scss' ]
})
export class SeriesComponent extends Secured implements OnInit {

  series: SeriesImageForm[] = [];

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: SeriesImageService
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
    this.service.listSeries()
      .subscribe(series => {
        this.series = series;
      });
  }

  valid(series: SeriesImageForm): boolean {
    return this.service.isValid(series.name);
  }

  attachFile(event: any, series: SeriesImageForm): void {
    series.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    this.service.saveSeriesImage(series)
      .subscribe();
  }

  removeSeries(series: SeriesImageForm): void {
    this.service.deleteSeries(series)
      .subscribe(() => {
        this.update();
      });
  }

  addSeries(): void {
    this.series.push({} as SeriesImageForm);
  }

}
