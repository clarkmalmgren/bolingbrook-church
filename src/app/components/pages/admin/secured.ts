import { OnInit }           from '@angular/core';
import { Router }           from '@angular/router';
import { FirebaseService }  from '../../../services/firebase.service';
import { Observable }       from '../../../services/observable';

export abstract class Secured implements OnInit {

  constructor(
    protected router: Router,
    protected firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.secure();
  }

  secure(): Observable<any> {
    return this.firebase.authenticated()
      .flatMap((authd) => {
        if (!authd) {
          this.router.navigate(['/admin/login']);
          return Observable.of('');
        } else {
          return Observable.of('');
        }
      })
      .catch((err) => {
        this.router.navigate(['/admin/login']);
        return Observable.of('');
      });
  }
}
