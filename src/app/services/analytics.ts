import { Injectable }                                     from '@angular/core';
import { Location }                                       from '@angular/common';
import { Router, NavigationEnd, NavigationStart, Event }  from '@angular/router';
import { Env }                                            from './env';
import { Observable, Observer }                           from './observable';

/* Make ga typesafe, sortof */
declare var ga: Function;

export class GoogleAnalyticsWrapper {
  get call(): Function {
    return ga;
  }
}

@Injectable()
export class Analytics {

  private navStartedAt: number = 0;
  private currentRoute: string;
  private analytics: GoogleAnalyticsWrapper;

  constructor(
    private router: Router,
    private location: Location,
    private env: Env
  ) { }

  init(analytics: GoogleAnalyticsWrapper = new GoogleAnalyticsWrapper()): void {
    this.analytics = analytics;

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.navStartedAt = performance.now();
      } else if (event instanceof NavigationEnd) {
        // When the route is '/', location.path actually returns ''.
        this.pageview(this.location.path() || '/');
      }
    });

    this.timing('angular', 'init', performance.now());
  }

  pageview(route: string): void {
    if (this.currentRoute != route) {
      this.analytics.call('set', 'page', route);
      this.analytics.call('send', 'pageview');

      if (this.currentRoute == null) {
        this.timing('pageview', 'init', performance.now());
      }

      this.timing('pageview', 'load', performance.now() - this.navStartedAt, route);
      this.currentRoute = route;
    }
  }

  event(category: string, action: string, label?: string, value?: number): Observable<any> {
    return this.submit('send', 'event', {
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value
    });
  }

  timing(category: string, variable: string, value: number, label?: string): Observable<any> {
    return this.submit('send', 'timing', {
      timingCategory: category,
      timingVar: variable,
      timingValue: value,
      timingLabel: label
    });
  }

  exception(description: string, fatal?: boolean): Observable<any> {
    return this.submit('send', 'exception', {
      exDescription: description,
      exFatal: !!fatal
    });
  }

  private submit(method: string, type: string, data: Object): Observable<any> {
    let o = Observable.create((observer: Observer<any>) => {
      /* Common methodology for closing out */
      let done = false;
      let complete = () => {
        if (!done) {
          done = true;
          observer.next('');
          observer.complete();
        }
      }

      /* Create the correct callback channel */
      data['hitCallback'] = (() => complete());

      /* Backup callback channel (Issue #49) */
      setTimeout(() => complete(), 250);

      /* Invoke the Analytics Call! */
      this.analytics.call(method, type, data);
    });

    /* It is important that at least someone subscribes or it won't actually fire */
    o.subscribe();

    return o;
  }


}