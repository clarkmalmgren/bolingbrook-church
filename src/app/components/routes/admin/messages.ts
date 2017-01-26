import { OnInit, Component }                        from '@angular/core';
import { Router }                                   from '@angular/router';
import { FirebaseService, Series, MessagesService } from '../../../services';
import { Secured }                                  from './secured';

@Component({
  templateUrl: './messages.html',
  styleUrls: [ './messages.scss' ]
})
export class Messages extends Secured {

  series: Series[];
  
  name: string;

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: MessagesService
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    this.secure()
      .flatMap(() => {
        return this.service.all();
      })
      .subscribe(series => {
        this.series = series;
      });
  }

  submit(): void {
    this.service.addSeries(this.name)
      .subscribe((id) => { this.router.navigate([ `/admin/messages/${id}` ]) });
  }

  get valid(): boolean {
    return !!this.name;
  }

}