import { OnInit, Component, NgZone }  from '@angular/core';
import { FirebaseService }            from '../../../services/firebase.service';
import { Secured }                    from './secured';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class HomeComponent implements OnInit {

  authd: boolean = false;

  constructor(
    private firebase: FirebaseService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.firebase
      .authenticated()
      .subscribe(authd => {
        this.authd = authd;
      });
  }

  login(): void {
    this.firebase
      .auth()
      .subscribe(_ => {
        this.zone.run(() => {
          this.authd = true;
        });
      });
  }

  logout(): void {
    this.firebase
      .logout()
      .subscribe(_ => {
        this.authd = false;
      });
  }

}
