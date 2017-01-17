import { Component, OnInit }        from '@angular/core';
import { MessagesService, Series }  from '../../../services';


@Component({
  templateUrl: './list.html',
  styleUrls: [ './list.scss' ]
})
export class MessageList implements OnInit {

  series: Series[];

  constructor(private service: MessagesService) {}

  ngOnInit() {
    this.service.all()
      .subscribe(series => { this.series = series; });
  }
}
