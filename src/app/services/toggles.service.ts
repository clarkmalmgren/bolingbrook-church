import { Injectable }         from '@angular/core';
import { FirebaseService }    from './firebase.service';
import { Observable }         from './observable';

export interface FeatureToggles {
  youtube_live: boolean;
  youtube_live_issues: boolean;
}

@Injectable()
export class TogglesService {

  toggles: FeatureToggles;

  constructor (
    private firebase: FirebaseService
  ) {}

  getToggles(): Observable<FeatureToggles> {
    if (this.toggles) {
      return Observable.of(this.toggles);
    } else {
      return this.firebase
        .database()
        .flatMap(db => db.watch(`features`))
        .map((toggles: FeatureToggles) => {
          this.toggles = toggles;
          return toggles;
        });
    }
  }
}
