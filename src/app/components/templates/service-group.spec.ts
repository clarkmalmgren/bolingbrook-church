import { expect, sinon, async, MockBuilder, spyOf, stubOf } from 'testing';
import { Router }                                           from '@angular/router';
import { ServiceGroup }                                     from './service-group';
import {
  Analytics,
  ConnectionRequest,
  ConnectionService,
  Observable
} from '../../services';

class TestableServiceGroup extends ServiceGroup {}

/* tslint:disable: no-unused-expression */
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
          stubOf(service.submit).calledOnce.should.be.true;
          stubOf(analytics.event).calledOnce.should.be.true;
          spyOf(router.navigate).calledOnce.should.be.true;
          spyOf(router.navigate).calledWith([ '/thank-you' ]).should.be.true;
        });
    }));
  });

});
