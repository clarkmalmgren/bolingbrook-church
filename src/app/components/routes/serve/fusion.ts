import { Component }    from '@angular/core';

@Component({
  templateUrl: './fusion.html',
  styleUrls: [ './fusion.scss' ]
})
export class Fusion {

  interests: { [key: string]: boolean } = {};

  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  submit(): void {
    console.log('submitted!');
  }

  get interests_list(): string[] {
    return Object.keys(this.interests)
      .filter(i => this.interests[i]);
  }

  get valid(): boolean {
    return !!this.first_name && !!this.last_name && !!this.email && !!this.phone && this.interests_list.length > 0;
  }
}