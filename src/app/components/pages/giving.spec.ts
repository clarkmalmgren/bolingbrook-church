import { expect, sinon, async, MockBuilder, stubOf }  from 'testing';
import { GivingComponent }                            from './giving';
import { Analytics, Observable, Aperture }            from 'app/services';

/* tslint:disable: no-unused-expression */
describe('GivingComponent', () => {

  describe('give', () => {
    it('should stop propogation', () => {
      const analytics = MockBuilder.of(Analytics)
        .withStub('event', Observable.empty())
        .build();

      const aperture = { browser: false } as Aperture

      const giving = new GivingComponent(analytics, aperture);
      expect(giving.give('easy')).to.be.false;
    });

    [
      ['easy', 'easytithe'],
      ['adventist', 'adventistgiving'],
      ['default', 'adventistgiving']
    ].forEach(([type, href]) => {
      it('should record analytics event and then navigate', () => {
        const analytics = MockBuilder.of(Analytics)
          .withStub('event', Observable.of(''))
          .build();

        const location = {} as Location;

        const aperture = { browser: false } as Aperture

        const giving = new GivingComponent(analytics, aperture);
        giving.ngOnInit()
        giving._location = location;
        giving.give(type);

        stubOf(analytics.event).calledWithMatch('nav').should.be.true;
        expect(location.href).to.contain(href);
      });
    });
  });

  describe('showing the envelope', () => {
    it('should register analytics event', () => {
      const analytics = MockBuilder.of(Analytics)
        .withStub('event', Observable.of(''))
        .build();

      const aperture = { browser: false } as Aperture

      const giving = new GivingComponent(analytics, aperture);
      const response = giving.showEnvelope();

      expect(response).to.be.false;
      expect(giving.envelopeShown).to.be.true;
      stubOf(analytics.event).calledWithMatch('overlay').should.be.true;
    });
  });

  describe('hiding the envelope', () => {
    it('just hide the envelope', () => {
      const aperture = { browser: false } as Aperture

      const giving = new GivingComponent(undefined, aperture);
      giving.envelopeShown = true;
      giving.hideEnvelope();

      expect(giving.envelopeShown).to.be.false;
    });
  });

});
