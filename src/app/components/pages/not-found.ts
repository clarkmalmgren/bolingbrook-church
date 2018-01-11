import { Component, OnInit }  from '@angular/core';
import { ResponseService }    from '../../services';

@Component({
  templateUrl: './not-found.html'
})
export class NotFoundComponent implements OnInit {

  constructor(private responseService: ResponseService) {}

  ngOnInit() {
    this.responseService.setStatus(404, 'Not Found');
  }
}
