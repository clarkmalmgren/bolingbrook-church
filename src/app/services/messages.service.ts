import { Injectable }         from '@angular/core';
import { Database, Storage }  from './firebase.service';
import { Observable }         from './observable';

type map = { [key: string]: any };

export interface Series {
  id: string;
  date: string;
  name: string;
  active: boolean;
  image_ref: string;
  services?: Sermon[];
}

export interface Sermon {
  id: string;
  name: string;
  date: string;
  vimeo_id?: string;
  youtube_id?: string;
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
        return this.deserializeSeries(data);
      });
  }

  addSeries(name: string): Observable<string> {
    if (name.length < 1) {
      return Observable.throw(new Error('Need a valid Series Name'));
    }

    let id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    let series = { id: id, name: name, active: false } as Series;

    return this.db.put(`data/messages/${id}`, this.serializeSeries(series))
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
          return this.db.put(`data/messages/${series.id}`, this.serializeSeries(series))
        });
    }

    return this.db.put(`data/messages/${series.id}`, this.serializeSeries(series));
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
        return this.db.toArray(data)
          .map(it => this.deserializeSeries(it))
          .sort((a, b) => {
            if (!a.date && !b.date) { return 0; }
            if (!a.date)            { return -1; }
            if (!b.date)            { return 1; }

            return b.date.localeCompare(a.date);
          });
      });
  }

  deserializeSeries(data: map): Series {
    let series = {
      id: data['_id'],
      date: data['date'],
      name: data['name'],
      active: !!data['active'],
      image_ref: data['image_ref']
    } as Series;

    if (data['services']) {
      series.services = this.db.toArray(data['services'])
        .map((sdata: map) => this.deserializeSermon(sdata));
    }

    return series;
  }

  deserializeSermon(data: map): Sermon {
    return {
      id: data['_id'],
      name: data['name'] || data['title'],
      date: data['date'],
      vimeo_id: data['vimeo_id'],
      youtube_id: data['youtube_id']
    };
  }

  serializeSeries(series: Series): map {
    let m = {
      _id: series.id,
      name: series.name,
      active: !!series.active
    };

    if (series.image_ref) {
      m['image_ref'] = series.image_ref
    }

    if (series.services) {
      let services: map[] = m['services'] = series.services.map(s => this.serializeSermon(s));
      m['date'] = services.map(i => i['date']).sort()[0];
    }

    return m;
  }

  serializeSermon(sermon: Sermon): map {
    let m = {
      _id: sermon.id,
      name: sermon.name,
      date: sermon.date
    };

    if (sermon.vimeo_id) {
      m['vimeo_id'] = sermon.vimeo_id;
    }

    if (sermon.youtube_id) {
      m['youtube_id'] = sermon.youtube_id;
    }

    return m;
  }
}
