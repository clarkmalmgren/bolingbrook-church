import { Component, Input, OnInit } from '@angular/core';
import { Storage, Series }  from '../../services';


@Component({
  selector: 'series-card',
  templateUrl: './series-card.html',
  styleUrls: [ './series-card.scss' ]
})
export class SeriesCard implements OnInit {

  @Input() series: Series;

  image: string;

  constructor(private storage: Storage) {}

  get route(): string {
    return this.series.id;
  }

  get parts(): number {
    return this.series.services ? this.series.services.length : 0;
  }

  ngOnInit() {
    this.storage.getUrl(this.series.image_ref)
      .subscribe(url => { this.image = url; });
  }
}