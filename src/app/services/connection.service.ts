import { Injectable }           from '@angular/core';
import { Database }             from './firebase.service';
import { Observable }           from './observable';

export type RequestType = ('serve' | 'connect' | 'mission');

export class ConnectionRequest {
  type: RequestType;

  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interests: string[];

  address: string;
  city: string;
  state: string;
  zipcode: number;
  birthday: string;

  constructor(type: RequestType) {
    this.type = type;
  }

  get valid(): boolean {
    return !!this.first_name && !!this.last_name && !!this.email && !!this.phone;
  }
}

@Injectable()
export class ConnectionService {

  constructor(private database: Database) {}

  submit(request: ConnectionRequest): Observable<any> {
    return this.database.push(`/connections/`, request);
  }
}