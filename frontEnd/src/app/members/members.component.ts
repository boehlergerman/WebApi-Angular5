import { Product } from './model/product.model';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './../common/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { MatTableDataSource } from '@angular/material';

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
  products: Array<Product>;
  displayedColumns = ['name', 'price', 'type', 'description'];
  dataSource

  constructor(public af: AngularFireAuth, private router: Router, private _authService: AuthenticationService,
    private productService: ProductService) {

    this.user = this._authService.user.userName;

  }

  logout() {
    this.af.auth.signOut();
    this._authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.productService.getAll().subscribe((data: Array<Product>) => {
      this.products = data;
      console.log(this.products);
      this.dataSource = new MatTableDataSource<Product>(this.products);
    },
      (error) => {
        console.error(error);
      });
  }

}
