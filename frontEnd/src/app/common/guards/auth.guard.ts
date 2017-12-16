import { CanActivate, Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.map(auth => {
      if (auth) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }

}