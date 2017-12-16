import { AuthenticationService } from './../common/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})
export class EmailComponent implements OnInit {

  state: string = '';
  error: any;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(public af: AngularFireAuth, private router: Router, private _authService: AuthenticationService) {
    this.af.authState.map(auth => {
      if (auth) 
        this.router.navigateByUrl('/members');
    });
  }

  getErrorMessageForUsername() {
    const hasError = this.username.hasError('required');
    return hasError ? 'User email is required' : '';
  }

  getErrorMessageForPassword() {
    const hasError = this.password.hasError('required');
    return hasError ? 'Password is required' : '';
  }

  onSubmit(event: Event) {
    if (this._authService.token(this.username.value, this.password.value)) {
      this.router.navigateByUrl('/members');
    } else {
      this.error = "Your account does not exist";
    }
  }
  ngOnInit() {
  }

}
