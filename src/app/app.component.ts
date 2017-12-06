import { Component, OnInit }      from '@angular/core';
import { Router, NavigationEnd }  from '@angular/router';
import { Analytics, Aperture }    from './services';

@Component({
  selector: 'bc-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: Analytics,
    private router: Router,
    private aperture: Aperture
  ) {}

  ngOnInit() {
    this.analytics.init();
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.aperture.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    });
  }
}
