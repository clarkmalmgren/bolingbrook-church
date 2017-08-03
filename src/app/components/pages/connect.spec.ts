import { expect, sinon, async, MockBuilder }  from 'testing';
import { ConnectComponent }                   from './connect';
import { Router }                             from '@angular/router';
import {
  Analytics,
  ConnectionRequest,
  ConnectionService,
  Observable
} from '../../services';

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
          expect(analytics.event).to.have.been.calledOnce;
          expect(router.navigate).to.have.been.calledOnce.and.calledWith([ '/thank-you' ]);
        });
    }));
  });

});
