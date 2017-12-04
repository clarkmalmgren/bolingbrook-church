import { expect, sinon, async, spyOf }                    from 'testing';

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

/* tslint:disable: no-unused-expression */
describe('GoogleAnalyticsWrapper', () => {

  it('should wrap GA', () => {
    window['ga'] = 'faceoff';
    const gaw = new GoogleAnalyticsWrapper();
    expect(gaw.call).to.equal('faceoff');
  });

});

describe('Analytics', () => {

  describe('init()', () => {

    it('should call global ga by default', () => {
      const a = new Analytics(undefined, undefined, undefined);
      expect(() => { a.init(); }).to.throw();
    });

    it('should init angular performance', () => {
      const subscribe = sinon.spy();
      const router = <Router><any> { events: { subscribe: subscribe } };
      const ga = sinon.spy();
      const gaw = new MockGoogleAnalyticsWrapper(ga);
      const env = { version: '3.3.3' } as Env;

      const a = new Analytics(env, undefined, router);

      a.init(gaw);

      spyOf(ga).calledWith('send', 'timing').should.be.true;
      spyOf(ga).calledWith('set', 'dimension1', '3.3.3').should.be.true;
      spyOf(subscribe).calledOnce.should.be.true;
    });

    it('event callbacks should work correctly', () => {
      let subscription: (event: Event) => void;
      const subscribe = sinon.stub().callsFake((fn) => { subscription = fn; });

      const router = <Router><any> { events: { subscribe: subscribe } };
      const ga = sinon.spy();
      const gaw = new MockGoogleAnalyticsWrapper(ga);
      const env = { version: '3.3.3' } as Env;

      const location = <Location><any> { path: sinon.stub().returns('') };

      const a = new Analytics(env, location, router);

      a.init(gaw);

      spyOf(ga).calledWith('send', 'timing').should.be.true;
      spyOf(subscribe).calledOnce.should.be.true;

      ga.reset();

      subscription(new NavigationStart(1, ''));
      subscription(new NavigationEnd(1, '', ''));

      spyOf(ga).callCount.should.equal(4);
      spyOf(ga).calledWith('set', 'page', '/').should.be.true;
      spyOf(ga).calledWith('send', 'pageview').should.be.true;
      spyOf(ga).calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'init' })).should.be.true;
      spyOf(ga).calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'load' })).should.be.true;

      ga.reset();

      subscription(new NavigationCancel(1, '/', 'just cause'));
      spyOf(ga).called.should.be.false;
    });

  });

  describe('pageview()', () => {
    it('should report correct events per lifecycle', () => {
      const subscribe = sinon.spy();
      const router = <Router><any> { events: { subscribe: subscribe } };
      const ga = sinon.spy();
      const gaw = new MockGoogleAnalyticsWrapper(ga);
      const env = { version: '3.3.3' } as Env;

      const a = new Analytics(env, undefined, router);

      a.init(gaw);

      /* First Pageview */
      ga.reset();
      a.pageview('/awesome');

      spyOf(ga).callCount.should.equal(4);
      spyOf(ga).calledWith('set', 'page', '/awesome').should.be.true;
      spyOf(ga).calledWith('send', 'pageview').should.be.true;
      spyOf(ga).calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'init' })).should.be.true;
      spyOf(ga).calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'load' })).should.be.true;

      /* Second new should not send init timing event */
      ga.reset();
      a.pageview('/awesome/more');

      spyOf(ga).callCount.should.equal(3);
      spyOf(ga).calledWith('set', 'page', '/awesome/more').should.be.true;
      spyOf(ga).calledWith('send', 'pageview').should.be.true;
      spyOf(ga).calledWith('send', 'timing', sinon.match({ timingCategory: 'pageview', timingVar: 'load' })).should.be.true;

      /* Third page is a reload and should not report */
      ga.reset();
      a.pageview('/awesome/more');

      spyOf(ga).called.should.be.false;
    });
  });

  describe('event()', () => {
    it('should work like a champ', async(() => {
      const subscribe = sinon.spy();
      const router = <Router><any> { events: { subscribe: subscribe } };
      const ga = sinon.spy();
      const gaw = new MockGoogleAnalyticsWrapper(ga);
      const env = { version: '3.3.3' } as Env;

      const a = new Analytics(env, undefined, router);

      a.init(gaw);
      ga.reset();

      a.event('awesome', 'pants', 'for', 1)
        .subscribe((val) => { expect(val).to.equal(''); });

      spyOf(ga).calledOnce.should.be.true;
      spyOf(ga).calledWith('send', 'event', sinon.match({
        eventCategory: 'awesome',
        eventAction: 'pants',
        eventLabel: 'for',
        eventValue: 1
      })).should.be.true;

      ga.getCall(0).args[2].hitCallback();
    }));
  });

  describe('exception()', () => {
    it('should work like a champ', async(() => {
      const subscribe = sinon.spy();
      const router = <Router><any> { events: { subscribe: subscribe } };
      const ga = sinon.spy();
      const gaw = new MockGoogleAnalyticsWrapper(ga);
      const env = { version: '3.3.3' } as Env;

      const a = new Analytics(env, undefined, router);

      a.init(gaw);
      ga.reset();

      a.exception('oh noes!', true)
        .subscribe((val) => { expect(val).to.equal('got it'); });

      spyOf(ga).calledOnce.should.be.true;
      spyOf(ga).calledWith('send', 'exception', sinon.match({
        exDescription: 'oh noes!',
        exFatal: true
      })).should.be.true;

      ga.getCall(0).args[2].hitCallback('got it');
    }));
  });

});
