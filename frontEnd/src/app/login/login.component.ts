import { AuthenticationService } from './../common/services/authentication.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, HostBinding } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIn()],
  host: { '[@moveIn]': '' }
})

export class LoginComponent implements OnInit {

  error: any;
  constructor(public af: AngularFireAuth, private router: Router, private _autService: AuthenticationService) {
  }

  loginFb() {
    this.af.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then(
      (success) => {
        const user = firebase.auth().currentUser;
        const pass = `${user.uid}@`;
        this._autService.token(user.email, pass).subscribe(
          (data) => {
            this._autService.setUser(data);
          },
          (err) => {
            this._autService.logIn(user.email, pass).subscribe(() => {
              this._autService.token(user.email, pass).subscribe(
                (data) => {
                  this._autService.setUser(data);
                }
              );
            },
              (error) => {
                this.error = error.error.ModelState[''][0];
                this._autService.resetUser();
              }
            );
          }
        );
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(
      (success) => {
        const user = firebase.auth().currentUser;
        const pass = `${user.uid}@`;
        this._autService.token(user.email, pass).subscribe(
          (data) => {
            this._autService.setUser(data);
          },
          (err) => {
            this._autService.logIn(user.email, pass).subscribe(() => {
              this._autService.token(user.email, pass).subscribe(
                (data) => {
                  this._autService.setUser(data);
                }
              );
            },
              (error) => {
                this.error = error.error.ModelState[''][0];
                this._autService.resetUser();
              }
            );
          }
        );
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  ngOnInit() {
  }

}
