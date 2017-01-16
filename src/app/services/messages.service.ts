import { Injectable }       from '@angular/core';
import { FirebaseService }  from './firebase.service';
import { Observable }       from './observable';

type map = { [key: string]: any };

export interface Series {
  id: string;
  date: Date;
  name: string;
  image_ref: string;
  services?: Service[];
}

export interface Service {
  id: string;
  name: string;
  date: Date;
  vimeo_id?: string;
  youtube_id?: string;
}

@Injectable()
export class MessagesService {

  constructor(private fb: FirebaseService) {}

  all(): Observable<Series[]> {
    return this.fb.getDataOnce('data/messages/')
      .map((data: any) => {
        return this.fb.toArray(data)
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
      series.services = this.fb.toArray(data['services'])
        .map((sdata: map) => this.deserializeService(sdata));
    }

    return series;
  }

  deserializeService(data: map): Service {
    return {
      id: data['_id'],
      name: data['name'],
      date: new Date(data['date']),
      vimeo_id: data['vimeo_id'],
      youtube_id: data['youtube_id']
    };
  }
}
