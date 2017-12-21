import { EditProductComponent } from './edit-product/edit-product.component';
import { Product } from './model/product.model';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './../common/services/authentication.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { MatTableDataSource, MatDialog, MatSort, MatMenuTrigger, MatPaginator } from '@angular/material';

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
  displayedColumns = ['name', 'price', 'type', 'description', 'actions'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public af: AngularFireAuth, private router: Router, private _authService: AuthenticationService,
    private productService: ProductService,
    public dialog: MatDialog) {

    this.user = this._authService.user.userName;

  }

  editProduct(product: Product) {
    this.openDialogToEditProduct(false, product);
  }

  addProduct() {
    this.openDialogToEditProduct(true);
  }

  deleteProduct(product: Product) {
    const dialogRef = this.dialog.open(DialogConfirm, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(product.id).subscribe(
          () => {
            this.getAllProduct();
          }
        );
      }
    });
  }

  openDialogToEditProduct(isNew: boolean, product?: Product) {
    console.log(product);
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        product: product,
        isNew: isNew
      },
      height: '500px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProduct();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  logout() {
    this.af.auth.signOut();
    this._authService.logout();
    if (this._authService.user.access_token !== '') {
      this._authService.user.access_token = '';
    }
    this.router.navigateByUrl('/login');
  }



  getAllProduct() {
    this.productService.getAll().subscribe((data: Array<Product>) => {
      console.log('awd');
      this.products = data;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      (error) => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.getAllProduct();
  }

}

// Component auxiliary
@Component({
  selector: 'dialog-confirm',
  template: `<h2 mat-dialog-title>Delete</h2>
  <mat-dialog-content>
    <p>Are you sure you want to remove the selected product?</p>
  </mat-dialog-content>
  <mat-dialog-actions>
    <button color="primary" mat-button [mat-dialog-close]="true" tabindex="1">Confirm</button>
    <button color="warn" style="margin-left: 0px;" mat-button mat-dialog-close tabindex="-1">Cancel</button>
  </mat-dialog-actions>`,
  styles: [
    `button {
      margin-bottom: 20px;
    }
    `
  ]
})
export class DialogConfirm { }