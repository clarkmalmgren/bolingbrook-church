import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService, Series }  from '../../services';


@Component({
  selector: 'series-card',
  templateUrl: './series-card.html',
  styleUrls: [ './series-card.scss' ]
})
export class SeriesCard implements OnInit {

  @Input() series: Series;

  image: string;

  constructor(private fbs: FirebaseService) {}

  get route(): string {
    return this.series.id;
  }

  get parts(): number {
    return this.series.services ? this.series.services.length : 0;
  }

  ngOnInit() {
    this.fbs.getStorageUrl(this.series.image_ref)
      .subscribe(url => { this.image = url; });
  }
}