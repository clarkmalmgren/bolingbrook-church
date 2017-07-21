import { expect, sinon } from 'testing';

import { Router, NavigationEnd, NavigationStart, Event }  from '@angular/router';
import { Analytics, GoogleAnalyticsWrapper }              from './analytics';

class MockGoogleAnalyticsWrapper extends GoogleAnalyticsWrapper {
  constructor(private wrapped: Function) {
    super();
  }

  get call(): Function {
    return this.wrapped;
  }
}

describe('the analytics platform', () => {

  describe('on init', () => {

    it('should actually init', () => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);

      let a = new Analytics(router, undefined, undefined);

      a.init(gaw);

      expect(ga).to.have.been.calledWith('send', 'timing');
    });

  });

});
