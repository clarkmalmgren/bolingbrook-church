import { Component }    from '@angular/core';
import { Env }          from '../../../services';

@Component({
  templateUrl: './serve.html',
  styleUrls: [ './serve.scss' ]
})
export class Serve {

  countdown: string = '';

  constructor(private env: Env) {
    setInterval(() => { this.updateCountdown() }, 1000);
  }

  get marchMadnessActive(): boolean {
    return this.env.marchMadnessActive;
  }

  get mobile(): boolean {
    return window.innerWidth < 830;
  }

  updateCountdown() {
    let diff = (this.env.endOfMarch - new Date().getTime()) / 1000;
    let seconds = Math.floor(diff % 60);
    let minutes = Math.floor(diff / 60 % 60);
    let hours   = Math.floor(diff / (60 * 60) % 24);
    let days    = Math.floor(diff / (60 * 60 * 24));

    this.countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
}