import { Component, Input, OnInit } from '@angular/core';
import {
  LinearPager,
  SermonService,
  Sermon
}  from '../../services';

@Component({
  selector: 'bc-sermon-list',
  templateUrl: './sermon-list.html',
  styleUrls: [ './sermon-list.scss' ]
})
export class SermonListComponent implements OnInit {

  sermons: Sermon[] = [];
  pager: LinearPager<Sermon>;

  constructor(private service: SermonService) {}

  ngOnInit() {
    this.pager = new LinearPager(this.service.complete());
    this.pager.itemsPerPage = 20;

    this.pager
      .observe()
      .subscribe(sermons => {
        this.sermons = this.sermons.concat(sermons);
      })
  }

  addSermons(): void {
    this.pager.next();
  }

}
