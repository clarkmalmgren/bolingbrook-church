import { expect, sinon, async }   from 'testing';
import { AppModule }              from './app.module';

/* tslint:disable no-unused-expression */
describe('AppModule', () => {
  it('can be created', () => {
    expect(new AppModule()).to.exist;
  });
});
