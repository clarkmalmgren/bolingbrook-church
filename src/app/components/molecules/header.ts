import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

interface Link {
  name: string,
  url: string
}

@Component({
  selector: 'sda-header',
  templateUrl: './header.html',
  styleUrls: [ './header.scss' ]
})
export class Header {

}