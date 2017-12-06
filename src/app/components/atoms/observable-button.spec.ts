import { expect, sinon, async, MockBuilder, spyOf } from 'testing';

import { EventEmitter }                             from '@angular/core';
import { ObservableButtonComponent }                from './observable-button';

/* tslint:disable: no-unused-expression */
describe('ObservableButton', () => {
  describe('handleClick', () => {
    it('should send off for processing', () => {
      const lb = new ObservableButtonComponent();
      const spy = sinon.spy(lb.bcOnClick, 'emit');

      lb.handleClick();

      spyOf(spy).called.should.be.true;
      expect(lb.loading).to.be.true;

      spy.getCall(0).args[0]();
      expect(lb.loading).to.be.false;
    });

    it('should do nothing if we are still loading', () => {
      const lb = new ObservableButtonComponent();
      const spy = sinon.spy(lb.bcOnClick, 'emit');
      lb.loading = true;

      lb.handleClick();

      spyOf(spy).called.should.be.false;
      expect(lb.loading).to.be.true;
    });
  });
});

