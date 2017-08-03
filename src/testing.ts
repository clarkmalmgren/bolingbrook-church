import { async }        from '@angular/core/testing';
import * as sinon       from 'sinon';
import * as chai        from 'chai';
import * as sinonChai   from 'sinon-chai';

chai.use(sinonChai);

const expect = chai.expect;


export class MockBuilder<T> {
  private object = {};

  static of<T>(clazz: new (...argv) => T): MockBuilder<T> {
    return new MockBuilder<T>();
  }

  with(key: string, fn: Function): MockBuilder<T> {
    const keys = key.split('.');
    let o = this.object;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      o[k] = o[k] || {};
      o = o[k];
    }

    o[keys[keys.length - 1]] = fn;
    return this;
  }

  withSpy(key: string): MockBuilder<T> {
    return this.with(key, sinon.spy());
  }

  withStub(key: string, returns: any): MockBuilder<T> {
    return this.with(key, sinon.stub().returns(returns));
  }

  build(): T {
    return this.object as T;
  }
}

export {
  async,
  expect,
  sinon
}
