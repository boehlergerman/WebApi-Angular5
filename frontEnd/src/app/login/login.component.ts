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

    this.af.authState.map(auth => {
      if (auth)
        this.router.navigateByUrl('/members');
    });
  }

  loginFb() {
    this.af.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    ).then(
      (success) => {
        let user = firebase.auth().currentUser;
        // False not exist
        const pass = `${user.uid}@`;
        if (this._autService.token(user.email, pass) === false) {
          this._autService.logIn(user.email, pass).subscribe(() => {
            this._autService.token(user.email, pass);

            this.router.navigate(['/members']);
          },
            (error) => {
              this.error = error.error.ModelState[""][0];
              this._autService.user = this._autService.settingInitUser;
            }
          );
        }
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(
      (success) => {
        let user = firebase.auth().currentUser;
        // False not exist
        const pass = `${user.uid}@`;
        if (this._autService.token(user.email, pass) === false) {
          this._autService.logIn(user.email, pass).subscribe(() => {
            this._autService.token(user.email, pass);

            this.router.navigate(['/members']);
          },
            (error) => {
              this.error = error.error.ModelState[""][0];
              this._autService.user = this._autService.settingInitUser;
            }
          );
        }
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  ngOnInit() {
  }

}
