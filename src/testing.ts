import { async }        from '@angular/core/testing';
import * as sinon       from 'sinon';
import * as chai        from 'chai';

const expect = chai.expect;
chai.should();

export class MockBuilder<T> {
  private object = {};

  static of<T>(clazz?: new (...argv) => T): MockBuilder<T> {
    return new MockBuilder<T>();
  }

  with(key: string, fn: any): MockBuilder<T> {
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

export function callCount(spy: any) {
  return spy.callCount;
}

export class Loop {
  static times(n: number) {
    return new Loop(n);
  }

  constructor(private times: number) {}

  do(fn: Function): void {
    for (let i = 0; i < this.times; i++) {
      fn();
    }
  }
}

export function spyOf(obj: any): sinon.SinonSpy {
  return obj as sinon.SinonSpy;
}

export function stubOf(obj: any): sinon.SinonStub {
  return obj as sinon.SinonStub;
}

export {
  async,
  expect,
  sinon
}
