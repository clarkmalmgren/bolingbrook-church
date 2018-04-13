import { Component, OnInit }                                from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeStyle, Meta }   from '@angular/platform-browser';
import { ActivatedRoute }                                   from '@angular/router';
import { Autoclean }                                        from '../../templates/autoclean';
import * as moment                                          from 'moment';
import                                                           'moment-timezone';

import {
  Analytics,
  Aperture,
  FeatureToggles,
  Observable,
  SeriesImageService,
  Sermon,
  SermonService,
  TogglesService,
  VideoState,
  WorshipService,
  YoutubeService
} from '../../../services';

interface DisplayWorshipService {
  identifier: string,
  url: SafeResourceUrl
}

@Component({
  templateUrl: './sermon.html',
  styleUrls: [ './sermon.scss' ]
})
export class SermonComponent extends Autoclean implements OnInit {

  error: boolean = false;
  sermon: Sermon;
  services: DisplayWorshipService[];
  icon: SafeStyle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private analytics: Analytics,
    private aperture: Aperture,
    private imageService: SeriesImageService,
    private meta: Meta,
    private sanitizer: DomSanitizer,
    private service: SermonService,
    private togglesService: TogglesService,
    private youtubeService: YoutubeService
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.params
      .flatMap((params) => {
        const id = params['sermon']
        return this.service.getSermon(id)
      })
      .subscribe(sermon => {
        if (!sermon) {
          this.error = true;
          this.meta.addTag({
            name: 'prerender-status-code',
            content: '404'
          });
        } else {
          this.sermon = sermon;
          this.services =
            sermon.services
              .map(s => {
                const url = `https://www.youtube.com/embed/${s.youtube}?enablejsapi=1`;
                return {
                  identifier: s.identifier,
                  url: this.sanitizer.bypassSecurityTrustResourceUrl(url)
                }
              })

          this.error = false;
          }
      }, (err) => {
        console.error('Sermon Loading Error', err);
        this.error = true;
        this.meta.addTag({
          name: 'prerender-status-code',
          content: '404'
        });
      });
  }
}
