import { expect, sinon } from 'testing';

import { Router, NavigationEnd, NavigationStart, Event }  from '@angular/router';
import { Analytics }                                      from './analytics';


describe('the analytics platform', () => {

  describe('on init', () => {

    it('should actually init', () => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();

      let a = new Analytics(router, undefined, undefined);

      a.init(ga);

      expect(ga).to.have.been.calledWith('send', 'timing');
    });

  });

});
