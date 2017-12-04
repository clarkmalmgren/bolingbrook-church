import { expect, sinon, async, MockBuilder, spyOf } from 'testing';
import { AppComponent }                             from './app.component';
import { Analytics }                                from './services';
import { Router, NavigationEnd }                    from '@angular/router';

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

      /* tslint:disable: no-unused-expression */
      spyOf(analytics.init).called.should.be.true;
      spyOf(router.events.subscribe).called.should.be.true;
    });

  });

});

