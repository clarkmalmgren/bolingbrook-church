import { Injectable }                     from '@angular/core';
import { FirebaseService, FirebaseUtils } from './firebase.service';
import { Observable }                     from './observable';
import { PaginatedPager, LinearPager }    from './pager';
import * as moment                        from 'moment';
import                                         'moment-timezone';

export interface Sermon {
  date: string;
  series: string;
  speaker: string;
  image?: string;
  youtube?: string;

  // deprecated
  name?: string;
}

@Injectable()
export class SermonService {

  constructor(private firebase: FirebaseService) {}

  private clean<T>(source: T): T {
    const cleaned = {} as T;

    Object.keys(source)
      .forEach(k => {
        if (typeof source[k] !== 'undefined') {
          cleaned[k] = source[k];
        }
      });

    return cleaned;
  }

  liveToday(date: moment.Moment = moment.tz('America/Chicago')): Observable<Boolean> {
    const dateString = date.format('YYYY-MM-DD');
    return this.firebase
      .database()
      .flatMap(db => db.exists(`data/sermons/${dateString}`));
  }

  getSermon(date: string): Observable<Sermon> {
    return this.firebase
      .database()
      .flatMap(db => db.getOnce(`data/sermons/${date}`))
      .map((sermon: Sermon) => {
        sermon.date = date;
        return sermon;
      });
  }

  saveSermon(sermon: Sermon): Observable<any> {
    return this.firebase
      .database()
      .flatMap(db => db.put(`data/sermons/${sermon.date}`, this.clean(sermon)));
  }

  deleteSermon(date: string): Observable<any> {
    return this.firebase
      .database()
      .flatMap(db => db.delete(`data/sermons/${date}`));
  }

  next(): Observable<Sermon> {
    return this.filter(false)
      .map(sermons => {
        if (sermons.length === 0) {
          throw new Error('No Sermons Found');
        }

        return sermons[sermons.length - 1];
      });
  }

  latest(): Observable<Sermon> {
    return this.complete()
      .map((sermons) => {
        return sermons[0];
      });
  }

  complete(): Observable<Sermon[]> {
    return this.filter(true);
  }

  filter(past: boolean): Observable<Sermon[]> {
    const threshold = this.liveThreshold();
    return this.all()
      .map((sermons) => {
        return sermons.filter(s => {
          const date = moment.tz(s.date, 'America/Chicago').add(12, 'hours');
          return (date.isBefore(threshold) === past);
        });
      });
  }

  paginated(): PaginatedPager<Sermon> {
    return new PaginatedPager(this.all());
  }

  all(): Observable<Sermon[]> {
    return this.firebase
      .database()
      .flatMap(db => db.getOnce('data/sermons'))
      .map((data: any) => {
        return FirebaseUtils
          .toArray(data, 'date')
          .map(it => (it as Sermon))
          .sort((a, b) => b.date.localeCompare(a.date));
      });
  }

  private liveThreshold(): moment.Moment {
    return moment().subtract(2, 'hours');
  }
}
