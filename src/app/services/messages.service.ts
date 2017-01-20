import { Injectable }       from '@angular/core';
import { Database }         from './firebase.service';
import { Observable }       from './observable';

type map = { [key: string]: any };

export interface Series {
  id: string;
  date: Date;
  name: string;
  image_ref: string;
  services?: Sermon[];
}

export interface Sermon {
  id: string;
  name: string;
  date: Date;
  vimeo_id?: string;
  youtube_id?: string;
}

@Injectable()
export class MessagesService {

  constructor(private db: Database) {}

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

  all(): Observable<Series[]> {
    return this.db.getOnce('data/messages/')
      .map((data: any) => {
        return this.db.toArray(data)
          .map(it => this.deserializeSeries(it))
          .sort((a, b) => { return b.date.getTime() - a.date.getTime(); });
      });
  }

  deserializeSeries(data: map): Series {
    let series = {
      id: data['_id'],
      date: new Date(data['date']),
      name: data['name'],
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
      date: new Date(data['date']),
      vimeo_id: data['vimeo_id'],
      youtube_id: data['youtube_id']
    };
  }
}
