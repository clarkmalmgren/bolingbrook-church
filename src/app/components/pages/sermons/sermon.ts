import { Component, OnInit, OnDestroy }                     from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle, Meta }   from '@angular/platform-browser';
import { ActivatedRoute }                                   from '@angular/router';

import {
  SermonService,
  Sermon,
  FeatureToggles,
  TogglesService,
  Subscription,
  SeriesImageService,
} from '../../../services';

@Component({
  templateUrl: './sermon.html',
  styleUrls: [ './sermon.scss' ]
})
export class SermonComponent implements OnInit, OnDestroy {

  error: boolean = false;
  sermon: Sermon;
  live: boolean = false;
  youtube_url: SafeResourceUrl;
  icon: SafeStyle;

  youtube_live: boolean = false;
  subscription: Subscription;

  constructor(
    private service: SermonService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private featureToggles: TogglesService,
    private imageService: SeriesImageService,
    private meta: Meta
  ) {}

  get showYoutube() {
    if (this.live) {
      return this.youtube_live;
    } else {
      return this.sermon && this.youtube_url;
    }
  }

  get showUstream(): boolean {
    return this.live && !this.youtube_live;
  }

  ngOnInit() {
    this.subscription = this.featureToggles.getToggles()
      .subscribe((toggles) => {
        this.youtube_live = toggles.youtube_live;
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

        if (sermon.image) {
          this.imageService.getSeriesImageStyle(sermon.image)
            .subscribe(style => { this.icon = style });
        }
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
