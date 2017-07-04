import { Component, Input, OnInit } from '@angular/core';
import { SermonService, Sermon }  from '../../services';

@Component({
  selector: 'sermon-list',
  templateUrl: './sermon-list.html',
  styleUrls: [ './sermon-list.scss' ]
})
export class SermonListComponent implements OnInit {

  @Input() sermons: Sermon[];

  constructor(private service: SermonService) {}

  ngOnInit() {
    this.service.all()
      .subscribe(sermons => { this.sermons = sermons; });
  }

}