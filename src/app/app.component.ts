import { Component, OnInit } from '@angular/core';
import { Analytics } from './services';

@Component({
  selector: 'bolingbrook-church',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: Analytics
  ) {}

  ngOnInit() {
    this.analytics.init();
  }
}
