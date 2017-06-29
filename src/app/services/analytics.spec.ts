import { Analytics } from './analytics';

describe('the analytics platform', () => {

  describe('on init', () => {

    it('should actually init', () => {
      let a = new Analytics(undefined, undefined, undefined);
      expect(a).not.toBeUndefined();
    });

  });

});