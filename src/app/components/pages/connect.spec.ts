import { expect, sinon, async, MockBuilder, spyOf } from 'testing';
import { ConnectComponent }                         from './connect';
import { Router }                                   from '@angular/router';
import {
  Analytics,
  ConnectionRequest,
  ConnectionService,
  Observable
} from '../../services';

/* tslint:disable: no-unused-expression */
describe('ConnectComponent', () => {

  describe('submit', () => {
    it('should submit to the service', async(() => {
      const service = MockBuilder.of(ConnectionService)
                        .withStub('submit', Observable.of(''))
                        .build();

      const router = MockBuilder.of(Router)
                        .withSpy('navigate')
                        .build();

      const analytics = MockBuilder.of(Analytics)
                          .withStub('event', Observable.of(''))
                          .build();

      const connect = new ConnectComponent(service, router, analytics);

      connect.submit()
        .subscribe(() => {
          spyOf(analytics.event).calledOnce.should.be.true;
          spyOf(router.navigate).calledOnce.should.be.true;
          spyOf(router.navigate).calledWith([ '/thank-you' ]).should.be.true;
        });
    }));
  });

});
