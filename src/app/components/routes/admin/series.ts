import { OnInit, Component }                                            from '@angular/core';
import { Router, ActivatedRoute }                                       from '@angular/router';
import { FirebaseService, Series, Sermon, MessagesService, Observable } from '../../../services';
import { Secured }                                                      from './secured';

@Component({
  templateUrl: './series.html',
  styleUrls: [ './series.scss' ]
})
export class SeriesComponent extends Secured {

  series: Series;
  file: File = undefined;

  constructor(
    router: Router,
    firebase: FirebaseService,
    private service: MessagesService,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, firebase);
  }

  ngOnInit() {
    let id: string;
    this.secure().subscribe(() => {
      this.service.all()
        .flatMap(() => { return this.activatedRoute.params })
        .flatMap((params) => {
          id = params['id'];
          return this.service.getSeries(id);
        })
        .subscribe(series => {
          this.series = series;
          if (!this.series.id) {
            this.series.id = id;
          }
        });
    });
  }

  removeSermon(index: number) {
    this.series.services.splice(index, 1);
  }

  addSermon(): void {
    if (!this.series.services) {
      this.series.services = [];
    }

    this.series.services.push({} as Sermon);
  }

  updateFile(e) {
    this.file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  }

  save(): void {
    this.service.saveSeries(this.series, this.file)
      .subscribe((id) => { this.router.navigate([ '/admin/messages' ]) });
  }

  delete(): void {
    this.service.deleteSeries(this.series)
      .subscribe((id) => { this.router.navigate([ '/admin/messages' ]) });
  }
  
  valid(): boolean {
    return !!this.series.name;
  }

}