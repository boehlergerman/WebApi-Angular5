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
  constructor(public af: AngularFireAuth, private router: Router) {

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
        this.router.navigate(['/members']);
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
        this.router.navigate(['/members']);
      }).catch(
      (err) => {
        this.error = err;
      })
  }

  ngOnInit() {
  }

}
