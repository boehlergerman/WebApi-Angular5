import { Config } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  apiAuthBaseURL = Config.API_SERVER_URL
  user = {
    access_token: "",
    userName: "",
    token_type: "",
  }
  settingInitUser = {
    access_token: "",
    userName: "",
    token_type: "",
  }
  hasSession = false;

  constructor(public http: HttpClient, public locker: SessionStorageService,
    private router: Router) {

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
    const url = `${this.apiAuthBaseURL}/api/Account/Register`;

    return this.http.post(url, {
      Email: username,
      Password: password,
      ConfirmPassword: password,
    })
  }

  public token(username: string, password: string): boolean {
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);


    this.http
      .post(`${this.apiAuthBaseURL}/Token`, body.toString()).subscribe(data => {
        this.user.access_token = data["access_token"];
        this.user.token_type = data["token_type"];
        this.user.userName = data["userName"];
        this.locker.store('user', this.user);
        this.hasSession = true;
        this.router.navigate(['/members']);
        return true;
      },
      (error: HttpErrorResponse) => {
        this.user = this.settingInitUser;
      }
      );

    return false;
  }

  public logout() {
    this.user = this.settingInitUser;
    this.hasSession = false;
    this.locker.clear('user');
  }

}