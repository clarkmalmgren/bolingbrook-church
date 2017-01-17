import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';
import { MessagesService, Series, Sermon }  from '../../../services';


@Component({
  templateUrl: './series.html',
  styleUrls: [ './series.scss' ]
})
export class SeriesComponent implements OnInit {

  seriesId: string;
  series: Series;

  constructor(
    private service: MessagesService,
    private activatedRoute: ActivatedRoute
  ) {}

  get sermons(): Sermon[] {
    return this.series ? this.series.services : [];
  }

  ngOnInit() {
    this.activatedRoute.params
      .flatMap((params) => {
        this.seriesId = params['series'];
        return this.service.getSeries(this.seriesId);
      })
      .subscribe(series => {
        this.series = series;
      });
  }
}
