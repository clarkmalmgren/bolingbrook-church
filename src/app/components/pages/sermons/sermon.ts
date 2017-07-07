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
  youtube_url: SafeResourceUrl;

  constructor(
    private service: SermonService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .flatMap((params) => {
        return this.service.getSermon(params['sermon']);
      })
      .subscribe(sermon => {
        this.sermon = sermon;
        let url = `https://www.youtube.com/embed/${sermon.youtube}`;
        this.youtube_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }
}
