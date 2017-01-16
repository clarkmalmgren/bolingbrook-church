import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService }          from '../../services';

@Component({
  selector: 'series-card',
  templateUrl: './series-card.html',
  styleUrls: [ './series-card.scss' ]
})
export class SeriesCard implements OnInit {
  @Input() image: string;
  @Input() route: string;
  @Input() parts: number;

  imageUrl: string;

  constructor(private fbs: FirebaseService) {}

  ngOnInit() {
    this.fbs.getStorageUrl(this.image)
      .subscribe(url => { this.imageUrl = url; });
  }
}