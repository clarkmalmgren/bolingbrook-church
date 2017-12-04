import { expect, sinon, async, MockBuilder }  from 'testing';
import { HeaderComponent }                    from './header';


/* tslint:disable no-unused-expression */
describe('HeaderComponent', () => {

  describe('on init', () => {
    it('should process using the default window', () => {
      const header = new HeaderComponent();
      header._window = { innerWidth: 449 } as Window;

      header.ngOnInit();
      expect(header.mobile).to.be.true;
    });
  });

  describe('on resize', () => {
    it('should process using the event target', () => {
      const header = new HeaderComponent();
      header._window = undefined;

      header.onResize({ target: { innerWidth: 449 } });
      expect(header.mobile).to.be.true;
    });
  });

  describe('screen size processing', () => {
    it('should have a 0px height if there is no image of video', () => {
      const header = new HeaderComponent();
      header._window = undefined;

      header.processScreenSize({ innerWidth: 449 } as Window);
      expect(header.assetHeight).to.equal('0px');
    });

    it('should have an appropriately calculated height for image', () => {
      const header = new HeaderComponent();
      header._window = undefined;
      header.image = 'I code, therfore I am!';
      header.relativeHeight = 0.5;
      header.absoluteHeight = 34;

      header.processScreenSize({ innerHeight: 1000 } as Window);
      expect(header.assetHeight).to.equal('534px');
    });

    it('should have an appropriately calculated height for video', () => {
      const header = new HeaderComponent();
      header._window = undefined;
      header.video = 'I code, therfore I am!';
      header.relativeHeight = 1.0;
      header.absoluteHeight = -30;

      header.processScreenSize({ innerHeight: 640 } as Window);
      expect(header.assetHeight).to.equal('610px');
    });
  });

});
