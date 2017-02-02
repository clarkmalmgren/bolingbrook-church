import { Component, OnInit, HostListener }                from '@angular/core';
import { BackgroundVideoService, BackgroundVideoSource }  from '../../services';

@Component({
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})
export class Home implements OnInit {

  _window = window;
  mobile: boolean;
  streaming: boolean = false;
  sources: BackgroundVideoSource[];
  
  constructor(
    private service: BackgroundVideoService
  ) {}

  ngOnInit() {
    this.updateMobile(this._window);

    this.service.getSources()
      .subscribe((sources) => {
        this.sources = sources;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateMobile(event.target);
  }

  updateMobile(window: Window) {
    this.mobile = (window.innerWidth < 450);
    console.log(`mobile: ${this.mobile}`);
  }
}