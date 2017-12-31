import { Observable, Observer } from '../src/app/services/observable';
import * as https               from 'https';

export class Sitemap {

  static DATABASE_URL: string = 'https://bolingbrook-church.firebaseio.com';
  static HOST: string = 'https://bolingbrook.church';
  static PAGES: string[] = [
    '/',
    '/about',
    '/beliefs',
    '/connect',
    '/events',
    '/friends-family-sabbath',
    '/giving',
    '/locations',
    '/newsletter',
    '/sermons',
    '/serve',
    '/serve/ask',
    '/serve/fusion',
    '/serve/media',
  ].map(p => Sitemap.HOST + p);

  sermons(): Observable<string[]> {
    return Observable.create((observer: Observer<string[]>) => {
      https.get(`${Sitemap.DATABASE_URL}/data/sermons.json`, res => {
        let body = '';
        res.on('data', data => { body += data; });
        res.on('end', () => {
          const sermons = JSON.parse(body);
          observer.next(Object.keys(sermons));
          observer.complete();
        });
      });
    })
  }

  render(): Observable<string> {
    return this.sermons()
      .map(dates => dates.map(d => Sitemap.HOST + '/sermons/' + d))
      .map(sermons => Sitemap.PAGES.concat(sermons))
      .map(urls => urls.join('\n'));
  }
}
