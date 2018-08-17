import { Injectable } from '@angular/core';
import { Observable, Observer } from './observable';
import { Aperture } from './aperture';
import { Http, Headers } from '@angular/http';
import { Moment } from 'moment';

const youtubeAuthRedirect =
  'https://accounts.google.com/o/oauth2/auth'
  + '?client_id=110300192266-4hkcf3pr3dthmrt7poei82m2gbnohmqm.apps.googleusercontent.com'
  + '&response_type=token'
  + '&scope=https://www.googleapis.com/auth/youtube'
  + '&redirect_uri='

const createEventUrl = 'https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status'

@Injectable()
export class YoutubeApiService {

  token: string

  constructor(
    private aperture: Aperture,
    private http: Http
  ) { }

  login(): boolean {
    if (this.token) {
      return true;
    }

    const pair =
      location.hash
        .substr(1)
        .split('&')
        .map(_ => _.split('='))
        .find(_ => _[0] === 'access_token')

    if (pair) {
      this.token = pair[1]
      return true
    } else {
      this.aperture.open(youtubeAuthRedirect + location.origin + '/admin', '_self')
      return false
    }
  }

  createEvent(title: string, description: string, start: Moment): Observable<string> {

    const body = {
      snippet: {
        title: title,
        description: description,
        scheduledStartTime: start.toISOString(),
        scheduledEndTime: start.clone().add(1, 'hour').toISOString()
      },
      status: {
        privacyStatus: 'private'
      }
    }

    return this.http
      .post(createEventUrl, body, { headers: new Headers({ 'Authorization': `Bearer ${this.token}` }) })
      .map(response => {
        return response.json().id as string
      })

  }

}
