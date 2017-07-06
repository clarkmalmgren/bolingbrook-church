import { Component, OnInit }                from '@angular/core';
import { DomSanitizer, SafeResourceUrl }    from '@angular/platform-browser';
import { Env }                              from '../../services';

const service_query = 'place_id:ChIJhfSXudNeDogRc69spHCK76Q';
const office_query  = 'place_id:ChIJsWqLHlBaDogRzwidXU9DMnk';

@Component({
  templateUrl: './locations.html',
  styleUrls: [ './locations.scss' ]
})
export class Locations implements OnInit {

  service_ref: SafeResourceUrl;
  office_ref: SafeResourceUrl;

  constructor(
    private env: Env,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.service_ref = this.getRef(service_query);
    this.office_ref = this.getRef(office_query);
  }

  getRef(query: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=${query}&key=${this.env.env.googleMapsApiKey}`
    );
  }
}