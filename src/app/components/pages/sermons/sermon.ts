import { Component, OnInit }                from '@angular/core';
import { DomSanitizer, SafeResourceUrl }    from '@angular/platform-browser';
import { ActivatedRoute }                   from '@angular/router';
import { SermonService, Sermon }            from '../../../services';


@Component({
  templateUrl: './sermon.html',
  styleUrls: [ './sermon.scss' ]
})
export class SermonComponent implements OnInit {

  sermon: Sermon;
  error: boolean = false;
  youtube_url: SafeResourceUrl;

  constructor(
    private service: SermonService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .flatMap((params) => {
        let id = params['sermon'];
        return id == 'live' ? this.service.next() : this.service.getSermon(id);
      })
      .subscribe(sermon => {
        this.sermon = sermon;
        let url = `https://www.youtube.com/embed/${sermon.youtube}`;
        this.youtube_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }, (err) => {
        this.error = true;
      });
  }
}
