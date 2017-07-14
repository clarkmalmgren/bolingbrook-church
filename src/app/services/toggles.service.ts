import { Injectable }         from '@angular/core';
import { Database }           from './firebase.service';
import { Observable }         from './observable';

export interface FeatureToggles {
  youtube_live: boolean;
}

@Injectable()
export class TogglesService {

  toggles: FeatureToggles;

  constructor (
    private db: Database
  ) {}

  getToggles(): Observable<FeatureToggles> {
    if (this.toggles) {
      return Observable.of(this.toggles);
    } else {
      return this.db.watch(`features`)
        .map((toggles: FeatureToggles) => {
          this.toggles = toggles;
          return toggles;
        })
    }
  }
}
