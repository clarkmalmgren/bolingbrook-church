import { expect, sinon, async, MockBuilder }      from 'testing';
import { SermonCardComponent }                    from './sermon-card';
import { Sermon, SeriesImageService, Observable } from '../../services';

describe('SermonCardComponent', () => {

  describe('get image', () => {
    it('should return a wrapped youtube url', () => {
      const scc = new SermonCardComponent(null);
      scc.sermon = { youtube: 'blah' } as Sermon;
      expect(scc.image).to.contain('blah');
    });
  });

  describe('get route', () => {
    it('should return a route by date', () => {
      const scc = new SermonCardComponent(null);
      scc.sermon = { date: '2001-11-04' } as Sermon;
      expect(scc.route).to.deep.equal([ '/sermons', '2001-11-04' ]);
    });
  });

  describe('on init', () => {
    it('should do nothing if there is no sermon image', () => {
      const scc = new SermonCardComponent(null);
      scc.sermon = { } as Sermon;
      scc.ngOnInit();
    });
  });

});
