import { Component, OnInit }                                      from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Meta }                    from '@angular/platform-browser';
import { ActivatedRoute }                                         from '@angular/router';
import { SermonService, Sermon, FeatureToggles, TogglesService }  from '../../../services';

@Component({
  templateUrl: './sermon.html',
  styleUrls: [ './sermon.scss' ]
})
export class SermonComponent implements OnInit {

  error: boolean = false;
  sermon: Sermon;
  ustream: boolean = false;
  youtube_url: SafeResourceUrl;

  constructor(
    private service: SermonService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private featureToggles: TogglesService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .flatMap((params) => {
        let id = params['sermon'];

        if (id == 'live') {
          return this.featureToggles.getToggles()
            .flatMap((toggles) => {
              this.ustream = !toggles.youtube_live;
              return this.service.next();
            })
        } else {
          this.ustream = false;
          return this.service.getSermon(id);
        }
      })
      .subscribe(sermon => {
        this.sermon = sermon;
        let url = `https://www.youtube.com/embed/${sermon.youtube}`;
        this.youtube_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.error = false;
      }, (err) => {
        console.error(err);
        this.error = true;
        this.meta.addTag({
          name: 'prerender-status-code',
          content: '404'
        });
      });
  }
}
