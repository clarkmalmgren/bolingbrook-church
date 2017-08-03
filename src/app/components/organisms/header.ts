import { Component, Input, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'bc-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

  _window: Window = window;

  @Input()
  video: any;

  @Input()
  image: string;

  @Input()
  shade: number = 0.0;

  @Input()
  relativeHeight: number = 1.0;

  @Input()
  absoluteHeight: number = 0;

  mobile: boolean = false;
  opened: boolean = false;
  assetHeight: string = 'auto';

  ngOnInit() {
    this.processScreenSize(this._window);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.processScreenSize(event.target);
  }

  processScreenSize(window: Window) {
    this.mobile = (window.innerWidth < 450);

    if (this.video || this.image) {
      const px = window.innerHeight * this.relativeHeight + this.absoluteHeight;
      this.assetHeight = `${px}px`;
    } else {
      this.assetHeight = '0px';
    }
  }
}
