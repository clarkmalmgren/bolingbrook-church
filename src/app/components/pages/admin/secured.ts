import { OnInit }           from '@angular/core';
import { Router }           from '@angular/router';
import { FirebaseService }  from '../../../services/firebase.service';
import { Observable }       from '../../../services/observable';
import { Autoclean }        from '../../templates/autoclean';

export abstract class Secured extends Autoclean implements OnInit {

  constructor(
    protected router: Router,
    protected firebase: FirebaseService
  ) {
    super();
  }

  ngOnInit(): void {
    this.secure();
  }

  secure(): Observable<boolean> {
    return this.firebase
      .authenticated()
      .flatMap((authd) => {
        if (!authd) {
          return Observable
            .fromPromise(this.router.navigate(['/admin']))
            .map(_ => false);
        } else {
          return Observable.of(true);
        }
      })
      .catch((err) => {
        return Observable
          .fromPromise(this.router.navigate(['/admin']))
          .map(_ => false);
      });
  }
}
