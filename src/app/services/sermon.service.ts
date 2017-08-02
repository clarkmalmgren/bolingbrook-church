import { Injectable }         from '@angular/core';
import { Database, Storage }  from './firebase.service';
import { Observable }         from './observable';
import * as moment            from 'moment';
import                             'moment-timezone';

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

  constructor(
    private db: Database,
    private store: Storage
  ) {}

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

  getSermon(date: string): Observable<Sermon> {
    return this.db.getOnce(`data/sermons/${date}`)
      .map((sermon: Sermon) => {
        sermon.date = date;
        return sermon;
      });
  }

  saveSermon(sermon: Sermon): Observable<any> {
    return this.db.put(`data/sermons/${sermon.date}`, this.clean(sermon));
  }

  deleteSermon(date: string): Observable<any> {
    return this.db.delete(`data/sermons/${date}`);
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

  all(): Observable<Sermon[]> {
    return this.db.getOnce('data/sermons')
      .map((data: any) => {
        return this.db.toArray(data, 'date')
          .map(it => (it as Sermon))
          .sort((a, b) => {
            return b.date.localeCompare(a.date);
          });
      });
  }

  private liveThreshold(): moment.Moment {
    return moment().subtract(2, 'hours');
  }
}
