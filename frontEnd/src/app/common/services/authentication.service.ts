import { Config } from './../config';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class AuthenticationService {
  apiAuthBaseURL = Config.API_SERVER_URL
  user;
  hasSession = false;

  constructor(public http: HttpClient, public locker: SessionStorageService) {

  }

  public isLoggedIn() {
    const user = this.locker.retrieve('user');
    if (!!user) {
      this.user = user;
      this.hasSession = true;
    }
    return this.hasSession;
  }

  public logIn(username: string, password: string) {
    const url = `${this.apiAuthBaseURL}/Account/Register`;

    return this.http.post(url, {
      username: username,
      password: password
    });
  }

  public logout() {
    this.user = null;
    this.hasSession = false;
    this.locker.clear('user');
  }

}