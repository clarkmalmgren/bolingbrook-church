import { Component, OnInit }        from '@angular/core';
import { MessagesService, Series }  from '../../../services';


@Component({
  templateUrl: './index.html',
  styleUrls: [ './index.scss' ]
})
export class MessageList implements OnInit {

  series: Series[];

  constructor(private service: MessagesService) {}

  ngOnInit() {
    this.service.all()
      .subscribe(series => { this.series = series; });
  }
}