import { expect, sinon, async, MockBuilder, stubOf } from 'testing';
import {
  Database,
  Storage,
  Sermon,
  SermonService,
  Observable
} from './index';
import * as moment                                   from 'moment';
import                                                    'moment-timezone';

/* tslint:disable: no-unused-expression */
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
          stubOf(db.exists).calledOnce.should.be.true;
        });

    }));
  });
});
