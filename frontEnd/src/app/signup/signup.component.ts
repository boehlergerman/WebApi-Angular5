import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { moveIn, fallIn } from '../router.animations';
import { AuthenticationService } from '../common/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' }
})

export class SignupComponent implements OnInit {

  state: string = '';
  error: any;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(public af: AngularFireAuth, private authService: AuthenticationService) {

  }

  getErrorMessageForUsername() {
    const hasError = this.username.hasError('required');
    return hasError ? 'User email is required' : '';
  }

  getErrorMessageForPassword() {
    const hasError = this.password.hasError('required');
    return hasError ? 'Contraseña is required' : '';
  }


  onSubmit(event: Event) {
    event.preventDefault();

    this.authService.logIn(this.username.value, this.password.value).subscribe(() => {
      this.authService.token(this.username.value, this.password.value).subscribe(
        (data) => {
          this.authService.setUser(data);
        }
      );
    },
      (error) => {
        this.error = error.error.ModelState[''][0];
        this.authService.resetUser();
      }
    );
  }


  ngOnInit() {
  }

}
