import { Component, OnInit }                from '@angular/core';
import { DomSanitizer, SafeResourceUrl }    from '@angular/platform-browser';
import { Env }                              from '../../services';

const location_query  = 'place_id:ChIJsWqLHlBaDogRzwidXU9DMnk';

@Component({
  templateUrl: './locations.html',
  styleUrls: [ './locations.scss' ]
})
export class LocationsComponent implements OnInit {

  location_ref: SafeResourceUrl;

  constructor(
    private env: Env,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.location_ref = this.getRef(location_query);
  }

  getRef(query: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/place?q=${query}&key=${this.env.env.googleMapsApiKey}`
    );
  }
}
