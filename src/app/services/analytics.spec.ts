import { expect, sinon, async }                           from 'testing';

import { Location }                                       from '@angular/common';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router
}  from '@angular/router';
import { Analytics, GoogleAnalyticsWrapper }              from './analytics';
import { Env }                                            from './env';

class MockGoogleAnalyticsWrapper extends GoogleAnalyticsWrapper {
  constructor(private wrapped: Function) {
    super();
  }

  get call(): Function {
    return this.wrapped;
  }
}

describe('GoogleAnalyticsWrapper', () => {

  it('should wrap GA', () => {
    window['ga'] = 'faceoff';
    let gaw = new GoogleAnalyticsWrapper();
    expect(gaw.call).to.equal('faceoff')
  });

});

describe('Analytics', () => {

  describe('init()', () => {

    it('should call global ga by default', () => {
      let a = new Analytics(undefined, undefined, undefined);
      expect(() => { a.init() }).to.throw();
    });

    it('should init angular performance', () => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);
      let env = { version: '3.3.3' } as Env;

      let a = new Analytics(env, undefined, router);

      a.init(gaw);

      expect(ga).to.have.been.calledWith('send', 'timing');
      expect(ga).to.have.been.calledWith('set', 'dimension1', '3.3.3');
      expect(subscribe).to.have.been.calledOnce;
    });

    it('event callbacks should work correctly', () => {
      let subscription: (event: Event) => void;
      let subscribe = sinon.stub().callsFake((fn) => { subscription = fn; });

      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);
      let env = { version: '3.3.3' } as Env;

      let location = <Location><any> { path: sinon.stub().returns('') };

      let a = new Analytics(env, location, router);

      a.init(gaw);

      expect(ga).to.have.been.calledWith('send', 'timing');
      expect(subscribe).to.have.been.calledOnce;

      ga.reset();

      subscription(new NavigationStart(1, ''));
      subscription(new NavigationEnd(1, '', ''));

      expect(ga).to.have.callCount(4);
      expect(ga).to.have.been.calledWith('set', 'page', '/');
      expect(ga).to.have.been.calledWith('send', 'pageview');
      expect(ga).to.have.been.calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'init' }));
      expect(ga).to.have.been.calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'load' }));

      ga.reset();

      subscription(new NavigationCancel(1, '/', 'just cause'));
      expect(ga).to.not.have.been.called;
    });

  });

  describe('pageview()', () => {
    it('should report correct events per lifecycle', () => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);
      let env = { version: '3.3.3' } as Env;

      let a = new Analytics(env, undefined, router);

      a.init(gaw);

      /* First Pageview */
      ga.reset();
      a.pageview('/awesome');

      expect(ga).to.have.callCount(4);
      expect(ga).to.have.been.calledWith('set', 'page', '/awesome');
      expect(ga).to.have.been.calledWith('send', 'pageview');
      expect(ga).to.have.been.calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'init' }));
      expect(ga).to.have.been.calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'load' }));

      /* Second new should not send init timing event */
      ga.reset();
      a.pageview('/awesome/more');

      expect(ga).to.have.callCount(3);
      expect(ga).to.have.been.calledWith('set', 'page', '/awesome/more');
      expect(ga).to.have.been.calledWith('send', 'pageview');
      expect(ga).to.have.been.calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'load' }));

      /* Third page is a reload and should not report */
      ga.reset();
      a.pageview('/awesome/more');

      expect(ga).to.not.have.been.called;
    });
  });

  describe('event()', () => {
    it('should work like a champ', async(() => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);
      let env = { version: '3.3.3' } as Env;

      let a = new Analytics(env, undefined, router);

      a.init(gaw);
      ga.reset();

      a.event('awesome', 'pants', 'for', 1)
        .subscribe((val) => { expect(val).to.equal(''); });

      expect(ga).to.have.been.calledOnce;
      expect(ga).to.have.been.calledWith('send', 'event', sinon.match({
        eventCategory: 'awesome',
        eventAction: 'pants',
        eventLabel: 'for',
        eventValue: 1
      }));

      ga.getCall(0).args[2].hitCallback();
    }));
  });

  describe('exception()', () => {
    it('should work like a champ', async(() => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);
      let env = { version: '3.3.3' } as Env;

      let a = new Analytics(env, undefined, router);

      a.init(gaw);
      ga.reset();

      a.exception('oh noes!', true)
        .subscribe((val) => { expect(val).to.equal('got it'); });

      expect(ga).to.have.been.calledOnce;
      expect(ga).to.have.been.calledWith('send', 'exception', sinon.match({
        exDescription: 'oh noes!',
        exFatal: true
      }));

      ga.getCall(0).args[2].hitCallback('got it');
    }));
  });

});
