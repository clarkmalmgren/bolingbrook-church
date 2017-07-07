import { Component, OnInit, HostListener }                                      from '@angular/core';
import { BackgroundVideoService, BackgroundVideoSource, SermonService, Sermon } from '../../services';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class Home implements OnInit {

  streaming: boolean = false;
  sources: BackgroundVideoSource[];
  sermon: Sermon;
  
  constructor(
    private service: BackgroundVideoService,
    private sermons: SermonService
  ) {}

  ngOnInit() {
    this.service.getSources()
      .subscribe((sources) => {
        this.sources = sources;
      });
    
    this.sermons.latest()
      .subscribe((sermon) => { this.sermon = sermon });
  }

}