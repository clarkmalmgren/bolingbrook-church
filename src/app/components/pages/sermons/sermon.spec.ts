import { expect, sinon, async, MockBuilder, callCount, stubOf, spyOf } from 'testing';
import { ActivatedRoute }                                              from '@angular/router';
import { SermonComponent }                                             from './sermon';
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

/* tslint:disable: no-unused-expression */
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

      stubOf(youtubeService.videoState).calledOnce.should.be.true;
      stubOf(youtubeService.videoState).calledWith('sermonVideo').should.be.true;
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
      sermon.interval = () => Observable.from(['', '']);
      sermon.videoState = VideoState.PLAYING;
      sermon.sermon = { youtube: 'Jesus4Life' } as Sermon;

      sermon.ngOnInit();

      window.setTimeout(() => {
        /* Giving a reasonable range to account for annoying time based testing */
        expect(callCount(analytics.event)).to.equal(2);
        spyOf(analytics.event).calledWith('Sermon', 'Playing', 'Jesus4Life').should.be.true;
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
      sermon.interval = () => Observable.of('');
      sermon.videoState = VideoState.PLAYING;
      sermon.live = true;
      sermon.sermon = { youtube: 'Jesus4Life' } as Sermon;

      sermon.ngOnInit();

      window.setTimeout(() => {
        spyOf(analytics.event).calledWith('Live Sermon', 'Playing', 'Jesus4Life').should.be.true;
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
        sermon.interval = () => Observable.of('');
        sermon.videoState = state;
        sermon.sermon = { youtube: 'Jesus4Life' } as Sermon;

        sermon.ngOnInit();

        window.setTimeout(() => {
          spyOf(analytics.event).called.should.be.false;
          sermon.ngOnDestroy();
        }, 25);
      }));
    });

  });

});
