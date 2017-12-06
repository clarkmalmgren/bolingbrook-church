import { Injectable }                               from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle } from '@angular/platform-browser';
import { FirebaseService }                          from './firebase.service';
import { Observable }                               from './observable';

export interface SeriesImageForm {
  name: string;
  url?: SafeResourceUrl;
  style?: SafeStyle;
  file?: File;
}

@Injectable()
export class SeriesImageService {

  constructor(
    private firebase: FirebaseService,
    private sanatizer: DomSanitizer
  ) {}

  isValid(name: string): boolean {
    return name && /^[A-Za-z_-]+$/.test(name);
  }

  getSeriesImage(name: string): Observable<string> {
    return this.firebase
      .storage()
      .flatMap(s => s.getUrl(`/series/${name}`));
  }

  getSeriesImageStyle(name: string): Observable<SafeStyle> {
    return this.getSeriesImage(name)
      .map(url => this.sanatizer.bypassSecurityTrustStyle(`url(${url})`));
  }

  saveSeriesImage(form: SeriesImageForm): Observable<any> {
    if (!this.isValid(form.name)) {
      throw new Error('Invalid Resource Name');
    }

    const path = `/series/${form.name}`;
    return this.firebase
      .storage()
      .flatMap(s => s.upload(path, form.file))
      .flatMap(() => this.firebase.database())
      .flatMap(db => db.put(`/data/series/${form.name}`, '0'));
  }

  deleteSeries(form: SeriesImageForm): Observable<any> {
    return this.firebase
      .database()
      .flatMap(db => db.delete(`/data/series/${form.name}`))
      .flatMap(() => this.firebase.storage())
      .flatMap(s => s.delete(`/series/${name}`));
  }

  listSeries(): Observable<SeriesImageForm[]> {
    return this.firebase
      .database()
      .flatMap(db => db.getOnce('data/series'))
      .flatMap((data: any) => Observable.from(Object.keys(data)))
      .flatMap((name) => {
        return this.getSeriesImage(`${name}`)
          .map((url) => { return {
            name: name,
            url: this.sanatizer.bypassSecurityTrustResourceUrl(url),
            style: this.sanatizer.bypassSecurityTrustStyle(`url(${url})`)
          } as SeriesImageForm; });
      })
      .toArray();
  }
}
