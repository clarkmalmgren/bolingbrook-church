import { expect, sinon, async, MockBuilder }  from 'testing';
import { AppComponent }                       from './app.component';
import { Analytics }                          from './services';
import { Router, NavigationEnd }              from '@angular/router';

describe('AppComponent', () => {

  describe('ngOnInit()', () => {

    it('should init analytics and call subscribe', () => {
      const analytics = MockBuilder.of(Analytics)
                          .withSpy('init')
                          .build();
      const router =    MockBuilder.of(Router)
                          .withSpy('events.subscribe')
                          .build();

      const app = new AppComponent(analytics, router);
      app.ngOnInit();

      expect(analytics.init).to.have.been.called;
      expect(router.events.subscribe).to.have.been.called;
    });

  });

});

