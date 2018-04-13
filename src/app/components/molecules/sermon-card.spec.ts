import { expect, sinon, async, MockBuilder }      from 'testing';
import { SermonCardComponent }                    from './sermon-card';
import { Sermon, SeriesImageService, Observable } from '../../services';

describe('SermonCardComponent', () => {

  describe('get route', () => {
    it('should return a route by date', () => {
      const scc = new SermonCardComponent(null);
      scc.sermon = { date: '2001-11-04' } as Sermon;
      expect(scc.route).to.deep.equal([ '/sermons', '2001-11-04' ]);
    });
  });

});
