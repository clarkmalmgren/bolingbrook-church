import { expect, sinon, async, MockBuilder, Loop, spyOf } from 'testing';
import { Autoclean }                                      from './autoclean';
import { Subscription }                                   from 'app/services';

class TestableAutoclean extends Autoclean {}

/* tslint:disable: no-unused-expression */
describe('Autoclean', () => {

  it('should clean up registered subscriptions', () => {
    const ac = new TestableAutoclean();
    const subscription = MockBuilder.of(Subscription)
                           .withSpy('unsubscribe')
                           .build();

    Loop.times(10).do(() => ac.autoclean(subscription));

    ac.ngOnDestroy();

    spyOf(subscription.unsubscribe).callCount.should.equal(10);
  });

});
