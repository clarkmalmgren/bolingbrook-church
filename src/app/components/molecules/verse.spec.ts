import { expect, sinon, async, MockBuilder }      from 'testing';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { VerseComponent }                         from './verse';
import { Analytics, Observable }                  from 'app/services';

describe('VerseComponent', () => {
  describe('url', () => {
    it('should construct correctly', () => {
      const verse = new VerseComponent(undefined, undefined);
      verse.book = 'John';
      verse.chapter = '3';
      verse.verses = '16';

      expect(verse.url).to
      .equal('https://www.bible.com/bible/111/John.3.16.NIV');
    });

    it('should be able to create a safe resource url', () => {
      const safe = {} as SafeResourceUrl;
      const sanitizer = MockBuilder.of<DomSanitizer>()
                          .withStub('bypassSecurityTrustResourceUrl', safe)
                          .build();

      const verse = new VerseComponent(sanitizer, undefined);
      expect(verse.safeResourceUrl).to.equal(safe);
    });
  });

  describe('frameHeight', () => {
    it('should be 600px on large devices', () => {
      const verse = new VerseComponent(undefined, undefined);
      verse._window = { innerHeight: 1000 } as Window;
      expect(verse.frameHeight).to.equal('600px');
    });

    it('should be 80px less than window height on smaller devices', () => {
      const verse = new VerseComponent(undefined, undefined);
      verse._window = { innerHeight: 500 } as Window;
      expect(verse.frameHeight).to.equal('420px');
    });

    it('should be 80px less than window height on smaller devices', () => {
      const verse = new VerseComponent(undefined, undefined);
      verse._window = { innerHeight: 679 } as Window;
      expect(verse.frameHeight).to.equal('599px');
    });
  });

  describe('launch', () => {
    it('should launch a new tab and log analytics', () => {
      const analytics = MockBuilder.of(Analytics)
                          .withSpy('event')
                          .build();

      const _window = MockBuilder.of(Window)
                        .withSpy('open')
                        .build();

      const verse = new VerseComponent(undefined, analytics);
      verse.book = 'John';
      verse.chapter = '3';
      verse.verses = '16';
      verse._window = _window;

      expect(verse.launch()).to.be.false;
      expect(analytics.event).to.have.been.calledOnce;
      expect(_window.open).to.have.been.calledOnce
        .and.calledWith('https://www.bible.com/bible/111/John.3.16.NIV', '_blank');
    });
  });

  describe('show', () => {
    it('should show and log analytics', () => {
      const analytics = MockBuilder.of(Analytics)
                          .withSpy('event')
                          .build();

      const verse = new VerseComponent(undefined, analytics);
      expect(verse.shown).to.be.false;

      expect(verse.show()).to.be.false;

      expect(analytics.event).to.have.been.calledOnce;
      expect(verse.shown).to.be.true;
    });
  });

  describe('hide', () => {
    it('should hide and nothing else', () => {
      const verse = new VerseComponent(undefined, undefined);
      expect(verse.shown).to.be.false;
      verse.shown = true;

      verse.hide();

      expect(verse.shown).to.be.false;
    });
  });

});
