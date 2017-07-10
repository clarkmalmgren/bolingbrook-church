import { Component, OnInit }      from '@angular/core';
import { Router, NavigationEnd }  from '@angular/router';
import { Analytics }              from './services';

@Component({
  selector: 'bolingbrook-church',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: Analytics,
    private router: Router
  ) {}

  ngOnInit() {
    this.analytics.init();
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }
}
