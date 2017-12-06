import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Aperture }                               from '../../services';

@Component({
  selector: 'bc-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {

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

  constructor(private aperture: Aperture) { }

  ngOnInit() {
    this.processScreenSize(this.aperture);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.processScreenSize(this.aperture.create(event.target));
  }

  processScreenSize(aperture: Aperture) {
    this.mobile = (aperture.innerWidth < 450);

    if (this.video || this.image) {
      const px = aperture.innerHeight * this.relativeHeight + this.absoluteHeight;
      this.assetHeight = `${px}px`;
    } else {
      this.assetHeight = '0px';
    }
  }
}
