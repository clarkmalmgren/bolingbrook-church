import { Component, OnInit, HostListener }                                      from '@angular/core';
import { BackgroundVideoService, BackgroundVideoSource, SermonService, Sermon } from '../../services';
import * as moment                                                              from 'moment';
import                                                                               'moment-timezone';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class HomeComponent implements OnInit {

  live: boolean = false;
  sources: BackgroundVideoSource[];
  sermon: Sermon;

  constructor(
    private service: BackgroundVideoService,
    private sermons: SermonService
  ) {}

  ngOnInit() {
    this.service
      .getSources()
      .subscribe((sources) => {
        this.sources = sources;
      });

    this.sermons
      .latest()
      .subscribe((sermon) => { this.sermon = sermon; });

    this.sermons
      .liveToday()
      .subscribe((liveToday) => {
        const now = moment.tz('America/Chicago');
        this.live = (liveToday && now.day() === 6 && now.hour() >= 10 &&  now.hour() < 13);
      });
  }

}
