import { expect, sinon, async }                           from 'testing';
import { Env }                                            from './env';

/* tslint:disable no-unused-expression */
describe('Env', () => {

  it('should be preloaded with default settings', () => {
    const env = new Env();

    expect(env).to.exist;
    expect(env.firebaseConfig).to.exist;
    expect(env.useBundledBackgroundVideo).to.exist;
    expect(env.version).to.exist;
  });

  it('should pull firebase info from env', () => {
    const env = new Env();
    env.env = { firebaseConfig: 'salmon' } as any;
    expect(env.firebaseConfig).to.equal('salmon');
  });

  it('should pull bg video info from env', () => {
    const env = new Env();

    env.env = { useBundledBackgroundVideo: true } as any;
    expect(env.useBundledBackgroundVideo).to.be.true;

    env.env = { useBundledBackgroundVideo: false } as any;
    expect(env.useBundledBackgroundVideo).to.be.false;
  });

  for (let i = 0; i < 25; i++) {
    const version: string = '' + Math.random();

    it('should pull version from node package info', () => {
      const env = new Env();

      env.nodePackage = { version: version };
      expect(env.version).to.equal(version);
    });
  }

});
