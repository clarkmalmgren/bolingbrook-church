import { expect, sinon, async, MockBuilder }        from 'testing';
import {
  Database,
  Storage,
  Sermon,
  SermonService,
  Observable
} from './index';
import * as moment                                  from 'moment';
import                                                   'moment-timezone';

describe('SermonService', () => {
  describe('liveToday', () => {
    it('should work', async(() => {
      const db = MockBuilder
        .of(Database)
        .withStub('exists', Observable.of(true))
        .build();

      const store = MockBuilder.of(Storage).build();

      const service = new SermonService(db, store);
      service
        .liveToday()
        .subscribe((isLive) => {
          expect(isLive).to.be.true;
          expect(db.exists).to.have.been.calledOnce;
        });

    }));
  });
});
