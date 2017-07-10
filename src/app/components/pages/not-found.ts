import { Component, OnInit }  from '@angular/core';
import { Meta }               from '@angular/platform-browser';

@Component({
  templateUrl: './not-found.html'
})
export class NotFound implements OnInit {

  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTag({
      name: 'prerender-status-code',
      content: '404'
    });
  }
}