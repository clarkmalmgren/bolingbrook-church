import { Injectable }                     from '@angular/core';
import { FirebaseService, FirebaseUtils } from './firebase.service';
import { Observable }                     from './observable';
import { PaginatedPager, LinearPager }    from './pager';
import * as moment                        from 'moment';
import                                         'moment-timezone';


interface WorshipServiceModel {
  start: string,
  identifier: string,
  youtube: string
}

interface SermonModel {
  date: string
  title: string
  series: string
  speaker: string
  description: string
  tags: string
  services: WorshipServiceModel[]
}

export class WorshipService implements WorshipService {

  static read(source: WorshipServiceModel): WorshipService {
    return new WorshipService(
      source.start,
      source.identifier,
      source.youtube
    )
  }

  constructor(
    public start: string,
    public identifier: string,
    public youtube: string
  ) {}

  get model(): WorshipServiceModel {
    return {
      start: this.start,
      identifier: this.identifier,
      youtube: this.youtube
    }
  }

  isBefore(date: string, time: moment.Moment): boolean {
    return moment.tz(`${date}T${this.start}`, 'America/Chicago').isBefore(time)
  }
}

export class Sermon implements SermonModel {

  static read(source: SermonModel): Sermon {
    if (!source) {
      return undefined;
    }

    return new Sermon(
      source.date,
      source.title,
      source.series,
      source.speaker,
      source.description,
      source.tags,
      source.services.map(_ => WorshipService.read(_))
    )
  }

  constructor(
    public date: string,
    public title: string,
    public series: string,
    public speaker: string,
    public description: string,
    public tags: string,
    public services: WorshipService[]
  ) {}

  get model(): SermonModel {
    return {
      date: this.date,
      title: this.title,
      series: this.series,
      speaker: this.speaker,
      description: this.description,
      tags: this.tags,
      services: this.services.map(_ => _.model)
    }
  }

  isBefore(time: moment.Moment): boolean {
    return moment(this.date).isBefore(time) || this.services.some(svc => svc.isBefore(this.date, time))
  }

}

@Injectable()
export class SermonService {

  constructor(private firebase: FirebaseService) {}

  private clean<T>(source: T): T {
    const cleaned = {} as T;

    Object.keys(source)
      .forEach(k => {
        if (typeof source[k] !== 'undefined') {
          cleaned[k] = source[k];
        }
      });

    return cleaned;
  }

  liveToday(date: moment.Moment = moment.tz('America/Chicago')): Observable<Boolean> {
    const dateString = date.format('YYYY-MM-DD');
    return this.firebase
      .database()
      .flatMap(db => db.exists(`data/sermons_v2/${dateString}`));
  }

  getSermon(date: string): Observable<Sermon> {
    return this.firebase
      .database()
      .flatMap(db => db.getOnce(`data/sermons_v2/${date}`))
      .map((model: SermonModel) => {
        return Sermon.read(model);
      });
  }

  saveSermon(sermon: Sermon): Observable<any> {
    return this.firebase
      .database()
      .flatMap(db => db.put(`data/sermons_v2/${sermon.date}`, this.clean(sermon.model)));
  }

  deleteSermon(date: string): Observable<any> {
    return this.firebase
      .database()
      .flatMap(db => db.delete(`data/sermons_v2/${date}`));
  }

  latest(): Observable<Sermon> {
    return this.complete()
      .map((sermons) => {
        return sermons[0];
      });
  }

  complete(time: moment.Moment = moment()): Observable<Sermon[]> {
    return this.all().map((sermons) => sermons.filter(s => s.isBefore(time)));
  }

  paginated(): PaginatedPager<Sermon> {
    return new PaginatedPager(this.all());
  }

  all(): Observable<Sermon[]> {
    return this.firebase
      .database()
      .flatMap(db => db.getOnce('data/sermons_v2'))
      .map((data: any) => {
        return FirebaseUtils
          .toArray(data, 'date')
          .map(it => (it as SermonModel))
          .sort((a, b) => b.date.localeCompare(a.date))
          .map(it => Sermon.read(it))
      });
  }
}
