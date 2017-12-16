import { AuthenticationService } from './../common/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})
export class MembersComponent implements OnInit {

  user: any;
  state: string = '';

  constructor(public af: AngularFireAuth, private router: Router, private _authService: AuthenticationService) {

    this.user =  this._authService.user.userName;

  }

  logout() {
    this.af.auth.signOut();
    this._authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
