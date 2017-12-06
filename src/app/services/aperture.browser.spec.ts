import { expect }             from 'testing';
import { BrowserAperture }    from './aperture.browser';

describe('BrowserAperture', () => {

    it('should wrap GA', () => {
      window.ga = () => 'faceoff';
      const ba = new BrowserAperture();
      expect(ba.ga()).to.equal('faceoff');
    });

});
