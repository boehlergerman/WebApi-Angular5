import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(public _authenticationService: AuthenticationService,
              public router: Router) {}

  canActivate (): boolean {
    if ( !this._authenticationService.isLoggedIn() ) {
      return true;
    }

    this.router.navigateByUrl( '/members' );
    return false;
  }
}
