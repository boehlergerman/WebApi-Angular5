import { Product } from './../model/product.model';
import { TypeProduct } from './../model/typeProduct.model';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  isBeingSave = false;
  product: Product = {};
  isNew = true;
  name = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  typeProductId = new FormControl('', [Validators.required]);
  typeProducts: Array<TypeProduct> = [];


  constructor(public productService: ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data["product"]) {
      this.product = data["product"];
    }
    
    this.isNew = data["isNew"];
    console.log(this.isNew);
  }

  ngOnInit() {
    this.getTypeProduct();
  }

  getTypeProduct() {
    this.productService.getAllTypeProduct().subscribe(
      (data: Array<TypeProduct>) => {
        this.typeProducts = data;
      }
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.isBeingSave = true;
    if (this.isNew) {
      this.productService.add(this.product).subscribe(
        () => {
          this.isBeingSave = false;
          this.dialogRef.close();
        }
      );
    } else {
      this.productService.update(this.product).subscribe(
        () => {
          this.isBeingSave = false;
          this.dialogRef.close();
        }
      );
    }

  }

  getErrorMessageForName() {
    return this.name.hasError('required') ?
      'Please enter a value' : '';
  }

  getErrorMessageForPrice() {
    return this.price.hasError('required') ?
      'Please enter a value' : '';
  }

  getErrorMessageForType() {
    return this.typeProductId.hasError('required') ?
      'Please enter a value' : '';
  }

  getErrorMessageForDescription() {
    return this.description.hasError('required') ?
      'Please enter a value' : '';
  }

  getErrorMessageForTitle() {
    return this.name.hasError('required') ?
      'Please enter a value' : '';
  }



}
