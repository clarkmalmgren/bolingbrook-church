import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';

/* Make ga typesafe, sortof */
declare var ga: Function;

@Component({
  selector: 'bolingbrook-church',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private currentRoute: string;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      // Send GA tracking on NavigationEnd event. You may wish to add other 
      // logic here too or change which event to work with
      if (event instanceof NavigationEnd) {
        // When the route is '/', location.path actually returns ''.
        let newRoute = this.location.path() || '/';
        // If the route has changed, send the new route to analytics.
        if (this.currentRoute != newRoute) {
          ga('send', 'pageview', newRoute);
          this.currentRoute = newRoute;
        }
      }
    })
  }
}
