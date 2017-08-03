import { OnInit, Component }  from '@angular/core';
import { Router }             from '@angular/router';
import { FirebaseService }    from '../../../services/firebase.service';
import { Secured }            from './secured';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class HomeComponent extends Secured {

  constructor(
    router: Router,
    firebase: FirebaseService
  ) {
    super(router, firebase);
  }

}
