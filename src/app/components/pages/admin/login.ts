import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { FirebaseService }    from '../../../services/firebase.service';

@Component({
  templateUrl: './login.html',
  styleUrls: [ './login.scss' ]
})
export class LoginComponent implements OnInit {

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firebase.auth().subscribe((user: any) => {
      this.router.navigate(['/admin']);
      console.log(`User: ${user}`);
    });
  }
}
