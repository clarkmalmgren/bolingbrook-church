import { expect, sinon, async, MockBuilder, stubOf } from 'testing';
import {
  FirebaseDatabase,
  FirebaseService,
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
      const db = { exists: () => Observable.of(true) } as any as FirebaseDatabase;
      const firebase = { database: () => Observable.of(db) } as any as FirebaseService;

      const service = new SermonService(firebase);
      service
        .liveToday()
        .subscribe((isLive) => {
          expect(isLive).to.be.true;
        });

    }));
  });
});
