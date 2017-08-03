import { Component, OnInit, Input }       from '@angular/core';
import { DomSanitizer, SafeResourceUrl }  from '@angular/platform-browser';

@Component({
  selector: 'bc-frame',
  templateUrl: './frame.html',
  styleUrls: [ './frame.scss' ]
})
export class FrameComponent implements OnInit {

  @Input()
  src: string;

  @Input()
  height: string;

  safeSrc: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
}
