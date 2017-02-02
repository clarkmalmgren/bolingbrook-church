import { Component, OnInit, EventEmitter, Output }  from '@angular/core';
import                                              'ustream-embedapi/src/ustream-embedapi';

declare class UstreamEmbed {
  constructor(id: string);

  callMethod(method: string);
  getProperty(key: string, callback: (val?: any) => any);
  addListener(type: string, callback: (type?: string, data?: any) => any);
}

@Component({
  selector: 'ustream',
  templateUrl: './ustream.html',
  styleUrls: ['./ustream.scss']
})
export class UStream implements OnInit {

  live: boolean = false;

  @Output('live')
  onLive = new EventEmitter<any>();

  @Output('offline')
  onOffline = new EventEmitter<any>();
  

  ngOnInit(): void {
    let viewer = new UstreamEmbed('liveStreamIframe');

    viewer.addListener('live', () => {
      this.live = true;
      this.onLive.emit(null);
    });

    viewer.addListener('offline', () => {
      this.live = false;
      this.onOffline.emit(null);
    });
  }
}