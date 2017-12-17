import { Config } from './../config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  apiAuthBaseURL = Config.API_SERVER_URL;
  user = {
    access_token: '',
    userName: '',
    token_type: '',
    isToken: true
  };
  settingInitUser = {
    access_token: '',
    userName: '',
    token_type: '',
    isToken: true
  };
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
    this.user.isToken = false;
    return this.http.post(url, {
      Email: username,
      Password: password,
      ConfirmPassword: password,
    });
  }

  public token(username: string, password: string) {
    let body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);


    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.user.isToken = true;
    return this.http
      .post(`${this.apiAuthBaseURL}/Token`, body.toString(), options);
    // .subscribe(data => {
    //   this.user.access_token = data['access_token'];
    //   this.user.token_type = data['token_type'];
    //   this.user.userName = data['userName'];
    //   this.locker.store('user', this.user);
    //   this.hasSession = true;
    //   this.router.navigate(['/members']);
    // },
    // (error: HttpErrorResponse) => {
    //   this.user = this.settingInitUser;
    // }
    // );
  }

  setUser(data) {
    this.user.access_token = data['access_token'];
    this.user.token_type = data['token_type'];
    this.user.userName = data['userName'];
    this.locker.store('user', this.user);
    this.hasSession = true;
    this.router.navigateByUrl('/members');
  }

  resetUser() {
    this.user = this.settingInitUser;
  }

  public logout() {
    this.user = this.settingInitUser;
    this.hasSession = false;
    this.locker.clear('user');
  }

}
