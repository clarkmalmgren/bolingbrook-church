import { expect, sinon, async, MockBuilder }  from 'testing';

import { EventEmitter }                       from '@angular/core';
import { ObservableButtonComponent }          from './observable-button';

describe('ObservableButton', () => {
  describe('handleClick', () => {
    it('should send off for processing', () => {
      const lb = new ObservableButtonComponent();
      const spy = sinon.spy(lb.bcOnClick, 'emit');

      lb.handleClick();

      expect(spy).to.have.been.calledOnce;
      expect(lb.loading).to.be.true;

      spy.getCall(0).args[0]();
      expect(lb.loading).to.be.false;
    });

    it('should do nothing if we are still loading', () => {
      const lb = new ObservableButtonComponent();
      const spy = sinon.spy(lb.bcOnClick, 'emit');
      lb.loading = true;

      lb.handleClick();

      expect(spy).to.not.have.been.called;
      expect(lb.loading).to.be.true;
    });
  });
});

