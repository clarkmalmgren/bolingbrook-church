import { Injectable }         from '@angular/core';
import { Database, Storage }  from './firebase.service';
import { Observable }         from './observable';

type map = { [key: string]: any };

export class Sermon {
  date: string;
  name: string;
  series: string;
  youtube: string;
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

  all(): Observable<Sermon[]> {
    return this.db.getOnce('data/sermons')
      .map((data: any) => {
        return this.db.toArray(data, 'date')
          .map(it => (it as Sermon))
          .sort((a, b) => {
            if (!a.date && !b.date) { return 0; }
            if (!a.date)            { return -1; }
            if (!b.date)            { return 1; }

            return b.date.localeCompare(a.date);
          });
      });
  }
}
