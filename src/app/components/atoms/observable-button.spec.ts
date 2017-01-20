// import { async, describe, it }  from '@angular/core/testing';
// import { sinon, expect }        from '../../test.tools';

// import { EventEmitter }         from '@angular/core';
// import { ObservableButton }     from './observable-button';

// describe('ObservableButton', () => {
//   describe('handleClick', () => {
//     it('should send off for processing', () => {
//       let lb = new ObservableButton();
//       let spy = sinon.spy(lb.click, 'emit');

//       lb.handleClick();

//       expect(spy).to.have.been.calledOnce;
//       expect(lb.loading).to.be.true;

//       spy.getCall(0).args[0]();
//       expect(lb.loading).to.be.false;
//     });

//     it('should do nothing if we are still loading', () => {
//       let lb = new ObservableButton();
//       let spy = sinon.spy(lb.click, 'emit');
//       lb.loading = true;

//       lb.handleClick();

//       expect(spy).to.not.have.been.called;
//       expect(lb.loading).to.be.true;
//     });
//   });
// });

