import { TypeProduct } from './../model/typeProduct.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Product } from './../model/product.model';
import { AuthenticationService } from '../../common/services/authentication.service';


@Injectable()
export class ProductService {

  constructor(public http: HttpClient, public _authService: AuthenticationService) { }

  getAll(): Observable<Array<Product>> {
    const url = `${this._authService.apiAuthBaseURL}/products`;
    console.log(url);
    return this.http.get<Array<Product>>(url);
  }

  update(product: Product): Observable<any> {
    const url = `${this._authService.apiAuthBaseURL}/products/${product.id}`;

    return this.http.put(url, product);
  }

  delete(id: number): Observable<any> {
    const url = `${this._authService.apiAuthBaseURL}/products/${id}`;

    return this.http.delete(url);
  }

  add(product: Product) {
    const url = `${this._authService.apiAuthBaseURL}/products`;

    return this.http.post(url, product);
  }


  getAllTypeProduct(): Observable<Array<TypeProduct>> {
    const url = `${this._authService.apiAuthBaseURL}/typeproduct`;

    return this.http.get<Array<TypeProduct>>(url);
  }
}
