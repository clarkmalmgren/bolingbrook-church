import { Injectable }         from '@angular/core';
import { Database, Storage }  from './firebase.service';
import { Observable }         from './observable';

type map = { [key: string]: any };

export class Series {
  id: string;
  date: string;
  name: string;
  active: boolean;
  image_ref: string;
  services: Sermon[];
}

export class Sermon {
  name: string;
  date: string;
  vimeo_id: string;
  youtube_id: string;
}

@Injectable()
export class MessagesService {

  constructor(
    private db: Database,
    private store: Storage
  ) {}

  getSermon(id: string, index: number): Observable<Sermon> {
    return this.getSeries(id)
      .map(series => series.services[index]);
  }

  getSeries(id: string): Observable<Series> {
    return this.db.getOnce(`data/messages/${id}`)
      .map((data: any) => {
        return data as Series
      });
  }

  addSeries(name: string): Observable<string> {
    if (name.length < 1) {
      return Observable.throw(new Error('Need a valid Series Name'));
    }

    let id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let series = { id: id, name: name, active: false } as Series;

    return this.db.put(`data/messages/${id}`, series)
      .map(() => { return id });
  }

  saveSeries(series: Series, file: File): Observable<any> {
    if (series.id.length < 1) {
      return Observable.throw(new Error('Need a valid Series Id'));
    }

    if (file) {
      let path = `/messages/thumbs/${series.id}/${file.name}`;
      series.image_ref = path;
      return this.store.upload(path, file)
        .flatMap(() => {
          return this.db.put(`data/messages/${series.id}`, series);
        });
    }

    return this.db.put(`data/messages/${series.id}`, series);
  }

  deleteSeries(series: Series): Observable<any> {
    if (series.id.length < 1) {
      return Observable.throw(new Error('Need a valid Series Id'));
    }

    return this.db.delete(`data/messages/${series.id}`);
  }

  allActive(): Observable<Series[]> {
    return this.all()
      .map((series) => {
        return series.filter(s => s.active);
      });
  } 

  all(): Observable<Series[]> {
    return this.db.getOnce('data/messages/')
      .map((data: any) => {
        return this.db.toArray(data, 'id')
          .map(it => (it as Series))
          .sort((a, b) => {
            if (!a.date && !b.date) { return 0; }
            if (!a.date)            { return -1; }
            if (!b.date)            { return 1; }

            return b.date.localeCompare(a.date);
          });
      });
  }
}
