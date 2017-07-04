import { Component, OnInit }        from '@angular/core';
import { SermonService, Sermon }    from '../../../services';

@Component({
  templateUrl: './list.html',
  styleUrls: [ './list.scss' ]
})
export class SermonList implements OnInit {

  sermons: Sermon[];

  constructor(private service: SermonService) {}

  ngOnInit() {
    this.service.all()
      .subscribe(sermons => { this.sermons = sermons; });
  }
}
