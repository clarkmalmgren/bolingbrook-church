import { Component, OnInit }                from '@angular/core';
import { DomSanitizer, SafeResourceUrl }    from '@angular/platform-browser';
import { ActivatedRoute }                   from '@angular/router';
import { MessagesService, Sermon }          from '../../../services';


@Component({
  templateUrl: './sermon.html',
  styleUrls: [ './sermon.scss' ]
})
export class SermonComponent implements OnInit {

  sermon: Sermon;
  vimeo_url: SafeResourceUrl;

  constructor(
    private service: MessagesService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    let series = '';
    this.activatedRoute.parent.params
      .flatMap((params) => {
        series = params['series'];
        return this.activatedRoute.params;
      })
      .flatMap((params) => {
        return this.service.getSermon(series, +params['sermon']);
      })
      .subscribe(sermon => {
        this.sermon = sermon;
        let url = `https://player.vimeo.com/video/${sermon.vimeo_id}`;
        this.vimeo_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }
}
