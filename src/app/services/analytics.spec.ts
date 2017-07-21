import { expect, sinon, async }                           from 'testing';

import { Location }                                       from '@angular/common';
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

describe('GoogleAnalyticsWrapper', () => {

  it('should wrap GA', () => {
    window['ga'] = 'faceoff';
    let gaw = new GoogleAnalyticsWrapper();
    expect(gaw.call).to.equal('faceoff')
  });

});

describe('Analytics', () => {

  describe('init()', () => {

    it('should init angular performance', () => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);

      let a = new Analytics(router, undefined);

      a.init(gaw);

      expect(ga).to.have.been.calledWith('send', 'timing');
      expect(subscribe).to.have.been.calledOnce;
    });

    it('event callbacks should work correctly', () => {
      let subscription: (event: Event) => void;
      let subscribe = sinon.stub().callsFake((fn) => { subscription = fn; });

      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);

      let location = <Location><any> { path: sinon.stub().returns('') };

      let a = new Analytics(router, location);

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
    });

  });

  describe('event()', () => {
    it('should work like a champ', async(() => {
      let subscribe = sinon.spy();
      let router = <Router><any> { events: { subscribe: subscribe } };
      let ga = sinon.spy();
      let gaw = new MockGoogleAnalyticsWrapper(ga);

      let a = new Analytics(router, undefined);

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

      let a = new Analytics(router, undefined);

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
