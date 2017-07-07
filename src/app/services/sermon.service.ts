import { Injectable }         from '@angular/core';
import { Database, Storage }  from './firebase.service';
import { Observable }         from './observable';
import * as moment            from 'moment';
import                             'moment-timezone';

type map = { [key: string]: any };

export class Sermon {
  date: string;
  name: string;
  series: string;
  youtube?: string;
}

@Injectable()
export class SermonService {

  constructor(
    private db: Database,
    private store: Storage
  ) {}

  getSermon(date: string): Observable<Sermon> {
    return this.db.getOnce(`data/sermons/${date}`)
      .map((sermon: Sermon) => {
        sermon.date = date;
        return sermon;
      });
  }

  saveSermon(sermon: Sermon): Observable<any> {
    return this.db.put(`data/sermons/${sermon.date}`, {
      name: sermon.name,
      series: sermon.series,
      youtube: sermon.youtube
    } as Sermon);
  }

  deleteSermon(date: string): Observable<any> {
    return this.db.delete(`data/sermons/${date}`);
  }

  next(): Observable<Sermon> {
    return this.filter(false)
      .map(sermons => {
        if (sermons.length == 0) {
          throw new Error("No Sermons Found");
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
    let threshold = this.liveThreshold();
    return this.all()
      .map((sermons) => {
        return sermons.filter(s => {
          let date = moment.tz(s.date, "America/Chicago").add(12, 'hours')
          return (date.isBefore(threshold) == past);
        })
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
