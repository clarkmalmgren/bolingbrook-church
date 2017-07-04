import { OnInit, Component }                                            from '@angular/core';
import { Router, ActivatedRoute }                                       from '@angular/router';
import { FirebaseService, Sermon, SermonService, Observable }           from '../../../services';
import { Secured }                                                      from './secured';

@Component({
  templateUrl: './sermons.html',
  styleUrls: [ './sermons.scss' ]
})
export class Sermons extends Secured {

  sermons: Sermon[];

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: SermonService,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    let id: string;
    this.secure().subscribe(() => {
      this.service.all()
        .subscribe(sermons => {
          this.sermons = sermons;
        });
    });
  }

  removeSermon(date: string): void {
    this.service.deleteSermon(date);
  }

  addSermon(date: string): void {
    this.sermons.push({} as Sermon);
  }

  saveSermon(sermon: Sermon): void {
    this.service.saveSermon(sermon);
  }

}