import { Injectable }                               from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { Database, Storage }                        from './firebase.service';
import { Observable }                               from './observable';

type map = { [key: string]: any };

export interface SeriesImageForm {
  name: string;
  url?: SafeResourceUrl;
  style?: SafeStyle;
  file?: File;
}

@Injectable()
export class SeriesImageService {

  constructor(
    private db: Database,
    private store: Storage,
    private sanatizer: DomSanitizer
  ) {}

  isValid(name: string): boolean {
    return name && /^[A-Za-z_-]+$/.test(name);
  }

  getSeriesImage(name: string): Observable<string> {
    return this.store.getUrl(`/series/${name}`);
  }

  getSeriesImageStyle(name: string): Observable<SafeStyle> {
    return this.getSeriesImage(name)
      .map(url => this.sanatizer.bypassSecurityTrustStyle(`url(${url})`));
  }

  saveSeriesImage(form: SeriesImageForm): Observable<any> {
    if (!this.isValid(form.name)) {
      throw new Error("Invalid Resource Name");
    }

    let path = `/series/${form.name}`;
    return this.store.upload(path, form.file)
      .flatMap(() => {
        return this.db.put(`/data/series/${form.name}`, '0');
      });
  }

  deleteSeries(form: SeriesImageForm): Observable<any> {
    return this.db.delete(`/data/series/${form.name}`)
      .flatMap(() => {
        return this.store.delete(`/series/${name}`);
      });
  }

  listSeries(): Observable<SeriesImageForm[]> {
    return this.db.getOnce('data/series')
      .flatMap((data: any) => {
        return Observable.from(Object.keys(data));
      })
      .flatMap((name) => {
        return this.getSeriesImage(`${name}`)
          .map((url) => { return {
            name: name,
            url: this.sanatizer.bypassSecurityTrustResourceUrl(url),
            style: this.sanatizer.bypassSecurityTrustStyle(`url(${url})`)
          } as SeriesImageForm });
      })
      .toArray();
  }
}
