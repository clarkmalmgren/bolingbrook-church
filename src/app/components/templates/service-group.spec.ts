import { expect, sinon, async, MockBuilder }  from 'testing';
import { Router }                             from '@angular/router';
import { ServiceGroup }                       from './service-group';
import {
  Analytics,
  ConnectionRequest,
  ConnectionService,
  Observable
} from '../../services';

class TestableServiceGroup extends ServiceGroup {}

describe('ServiceGroup', () => {

  describe('constructor', () => {
    it('should work', () => {
      const sg = new TestableServiceGroup(
        undefined,
        undefined,
        undefined,
        'hero',
        'title',
        'sub',
        [ 'it does this', 'and this' ],
        {
          a: { name : 'Eh', description: 'Aye' },
          b: { name: 'Bee', description: 'Honey' }
        }
      );

      expect(sg).to.exist;
      expect(sg.typeKeys).to.have.lengthOf(2);
      expect(sg.typesArray).to.have.lengthOf(2);
    });
  });

  describe('submit', () => {
    it('should submit exactly once', async(() => {
      const service = MockBuilder.of(ConnectionService)
                        .withStub('submit', Observable.of(''))
                        .build();

      const analytics = MockBuilder.of(Analytics)
                          .withStub('event', Observable.of(''))
                          .build();

      const router = MockBuilder.of(Router)
                       .withSpy('navigate')
                       .build();

      const sg = new TestableServiceGroup(
        service,
        router,
        analytics,
        undefined,
        undefined,
        undefined,
        undefined,
        {}
      );

      sg.submit()
        .subscribe(() => {
          expect(service.submit).to.have.been.calledOnce;
          expect(analytics.event).to.have.been.calledOnce;
          expect(router.navigate).to.have.been.calledOnce.and.be.calledWith([ '/thank-you' ]);
        });
    }));
  });

});
