import { AuthenticationService } from './../services/authentication.service';
import { CanActivate, Router } from '@angular/router';

import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public _authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(): boolean {
    if (this._authenticationService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}