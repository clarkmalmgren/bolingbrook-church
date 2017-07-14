import { OnInit, Component }                                              from '@angular/core';
import { Router }                                                         from '@angular/router';
import { FirebaseService, Series, SeriesForm, SeriesService, Observable } from '../../../services';
import { Secured }                                                        from './secured';

@Component({
  templateUrl: './series.html',
  styleUrls: [ './series.scss' ]
})
export class SeriesComponent extends Secured {

  series: SeriesForm[] = [];

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: SeriesService
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    this.secure().subscribe(() => { this.update(); });
  }

  update(): void {
    this.service.listSeries()
      .subscribe(series => {
        this.series = series;
      });
  }

  attachFile(event: any, series: SeriesForm): void {
    series.file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
  }

  removeSeries(series: SeriesForm): void {
    this.service.deleteSeries(series)
      .subscribe(() => {
        this.update();
      });
  }

  addSeries(): void {
    this.series.push({} as SeriesForm);
  }

  saveSeries(series: Series): void {
    this.service.saveSeries(series)
      .subscribe();
  }

}