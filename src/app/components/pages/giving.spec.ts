import { expect, sinon, async, MockBuilder }  from 'testing';
import { GivingComponent }                    from './giving';
import { Analytics, Observable }              from 'app/services';

describe('GivingComponent', () => {

  describe('give', () => {
    it('should stop propogation', () => {
      const analytics = MockBuilder.of(Analytics)
        .withStub('event', Observable.empty())
        .build();

      const giving = new GivingComponent(analytics);
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

        const giving = new GivingComponent(analytics);
        giving._location = location;
        giving.give(type);

        expect(analytics.event).to.have.been.calledWithMatch('nav');
        expect(location.href).to.contain(href);
      });
    });
  });

  describe('showing the envelope', () => {
    it('should register analytics event', () => {
      const analytics = MockBuilder.of(Analytics)
        .withStub('event', Observable.of(''))
        .build();

      const giving = new GivingComponent(analytics);
      const response = giving.showEnvelope();

      expect(response).to.be.false;
      expect(giving.envelopeShown).to.be.true;
      expect(analytics.event).to.have.been.calledWithMatch('overlay');
    });
  });

  describe('hiding the envelope', () => {
    it('just hide the envelope', () => {
      const giving = new GivingComponent(undefined);
      giving.envelopeShown = true;
      giving.hideEnvelope();

      expect(giving.envelopeShown).to.be.false;
    });
  });

});
