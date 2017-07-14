import { Injectable }         from '@angular/core';
import { Database, Storage }  from './firebase.service';
import { Observable }         from './observable';

type map = { [key: string]: any };

export interface Series {
  id: string;
  name: string;
  image: string;
}

export interface SeriesForm extends Series {
  file?: File;
}

@Injectable()
export class SeriesService {

  constructor(
    private db: Database,
    private store: Storage
  ) {}

  private clean(series: Series): Series {
    return {
      name: series.name,
      image: series.image
    } as Series;
  }

  private newId(length: number): string {
    let id = '';
    for (let i = 0; i < length; i++) {
      id += Math.floor(Math.random() * 36).toString(36);
    }
    return id;
  } 

  getSeries(id: string): Observable<Series> {
    return this.db.getOnce(`data/series/${id}`)
      .map((series: Series) => {
        series.id = id;
        return series;
      });
  }


  saveSeries(series: SeriesForm): Observable<any> {
    /* Add a series ID if one doesn't exist */
    if (!series.id) {
      series.id = this.newId(12);
    }

    if (series.file) {
      let type = series.file.name.match(/\.[^\.]*/)[0];
      let path = `/series/${series.id}.${type}`;
      return this.store.upload(path, series.file)
        .flatMap(() => {
          series.image = path;
          return this.db.put(`data/series/${series.id}`, this.clean(series));
        }).map(() => {
          series.file = undefined;
        });
    } else {
      return this.db.put(`data/series/${series.id}`, this.clean(series));
    }
  }

  deleteSeries(series: Series): Observable<any> {
    return this.db.delete(`data/series/${series.id}`)
      .flatMap(() => {
        return series.image ? this.store.delete(series.image) : Observable.of('');
      });
  }

  listSeries(): Observable<Series[]> {
    return this.db.getOnce('data/series')
      .map((data: any) => {
        return this.db.toArray(data, 'id')
          .map(it => (it as Series))
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
      });
  }
}
