import { Component, OnInit, OnDestroy }                                         from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Meta }                                  from '@angular/platform-browser';
import { ActivatedRoute }                                                       from '@angular/router';
import { SermonService, Sermon, FeatureToggles, TogglesService, Subscription }  from '../../../services';

@Component({
  templateUrl: './sermon.html',
  styleUrls: [ './sermon.scss' ]
})
export class SermonComponent implements OnInit, OnDestroy {

  error: boolean = false;
  sermon: Sermon;
  ustream: boolean = false;
  live: boolean = false;
  youtube_url: SafeResourceUrl;

  subscription: Subscription;

  constructor(
    private service: SermonService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private featureToggles: TogglesService,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.subscription = this.featureToggles.getToggles()
      .subscribe((toggles) => {
        this.ustream = !toggles.youtube_live;
      });

    this.activatedRoute.params
      .flatMap((params) => {
        let id = params['sermon'];

        if (id == 'live') {
          this.live = true;
          return this.service.next();
        } else {
          this.live = false;
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
