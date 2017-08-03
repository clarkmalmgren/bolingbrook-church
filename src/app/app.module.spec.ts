import { expect, sinon, async }   from 'testing';
import { AppModule }              from './app.module';

describe('AppModule', () => {

  it('can be created', () => {
    expect(new AppModule()).to.exist;
  });
});