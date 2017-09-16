import { expect, sinon, async, MockBuilder, callCount } from 'testing';
import { ActivatedRoute }                               from '@angular/router';
import { SermonComponent }                              from './sermon';
import {
  Analytics,
  FeatureToggles,
  Observable,
  SeriesImageService,
  Sermon,
  SermonService,
  TogglesService,
  VideoState,
  YoutubeService
} from 'app/services';

describe('SermonComponent', () => {

  describe('ngOnInit', () => {

    it('should subscribe to video state changes', async(() => {
      const youtubeService = MockBuilder.of(YoutubeService)
                                .withStub('videoState', Observable.of(VideoState.BUFFERING))
                                .build();

      const activatedRoute = MockBuilder.of(ActivatedRoute)
                                .with('params', Observable.empty())
                                .build();

      const togglesService = MockBuilder.of(TogglesService)
                                .withStub('getToggles', Observable.empty())
                                .build();

      const sermon = new SermonComponent(activatedRoute, null, null, null, null, null, togglesService, youtubeService);

      sermon.ngOnInit();

      expect(youtubeService.videoState).to.have.been.calledOnce.and.calledWith('sermonVideo');
      expect(sermon.videoState).to.equal(VideoState.BUFFERING);

      sermon.ngOnDestroy();
    }));

    it('should register analytics events on an appropriate cadence', async(() => {
      const youtubeService = MockBuilder.of(YoutubeService)
                                .withStub('videoState', Observable.empty())
                                .build();

      const activatedRoute = MockBuilder.of(ActivatedRoute)
                                .with('params', Observable.empty())
                                .build();

      const analytics = MockBuilder.of(Analytics)
                          .withSpy('event')
                          .build();

      const togglesService = MockBuilder.of(TogglesService)
                                .withStub('getToggles', Observable.empty())
                                .build();

      const sermon = new SermonComponent(activatedRoute, analytics, null, null, null, null, togglesService, youtubeService);
      sermon.analyticsInterval = 5;
      sermon.videoState = VideoState.PLAYING;
      sermon.sermon = { youtube: 'Jesus4Life' } as Sermon;

      sermon.ngOnInit();

      window.setTimeout(() => {
        /* Giving a reasonable range to account for annoying time based testing */
        expect(callCount(analytics.event)).to.be.at.least(2).and.at.most(6);
        expect(analytics.event).to.have.been.calledWith('Sermon', 'Playing', 'Jesus4Life');
        sermon.ngOnDestroy();
      }, 25);
    }));

    it('should register live analytics events as appropriate', async(() => {
      const youtubeService = MockBuilder.of(YoutubeService)
                                .withStub('videoState', Observable.empty())
                                .build();

      const activatedRoute = MockBuilder.of(ActivatedRoute)
                                .with('params', Observable.empty())
                                .build();

      const analytics = MockBuilder.of(Analytics)
                          .withSpy('event')
                          .build();

      const togglesService = MockBuilder.of(TogglesService)
                              .withStub('getToggles', Observable.empty())
                              .build();
      const sermon = new SermonComponent(activatedRoute, analytics, null, null, null, null, togglesService, youtubeService);
      sermon.analyticsInterval = 5;
      sermon.videoState = VideoState.PLAYING;
      sermon.live = true;
      sermon.sermon = { youtube: 'Jesus4Life' } as Sermon;

      sermon.ngOnInit();

      window.setTimeout(() => {
        expect(analytics.event).to.have.been.calledWith('Live Sermon', 'Playing', 'Jesus4Life');
        sermon.ngOnDestroy();
      }, 25);
    }));

    [
      VideoState.BUFFERING,
      VideoState.CUED,
      VideoState.ENDED,
      VideoState.PAUSED,
      VideoState.UNSTARTED
    ].forEach(state => {
      it(`should not call analytics when video state is "${state}"`, async(() => {
        const youtubeService = MockBuilder.of(YoutubeService)
                                  .withStub('videoState', Observable.empty())
                                  .build();

        const activatedRoute = MockBuilder.of(ActivatedRoute)
                                  .with('params', Observable.empty())
                                  .build();

        const analytics = MockBuilder.of(Analytics)
                            .withSpy('event')
                            .build();

      const togglesService = MockBuilder.of(TogglesService)
                                .withStub('getToggles', Observable.empty())
                                .build();

        const sermon = new SermonComponent(activatedRoute, analytics, null, null, null, null, togglesService, youtubeService);
        sermon.analyticsInterval = 5;
        sermon.videoState = state;
        sermon.sermon = { youtube: 'Jesus4Life' } as Sermon;

        sermon.ngOnInit();

        window.setTimeout(() => {
          expect(analytics.event).to.not.have.been.called;
          sermon.ngOnDestroy();
        }, 25);
      }));
    });

  });

});
