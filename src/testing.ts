import { async }        from '@angular/core/testing';
import * as sinon       from 'sinon';
import * as chai        from 'chai';
import * as sinonChai   from 'sinon-chai';

chai.use(sinonChai);

const expect = chai.expect;

export {
  async,
  expect,
  sinon
}
