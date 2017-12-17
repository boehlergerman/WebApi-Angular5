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
    const url = `${this._authService.apiAuthBaseURL}/api/Products`;
    return this.http.get<Array<Product>>(url);
  }

  update(product: Product): Observable<any> {
    const url = `${this._authService.apiAuthBaseURL}/api/Products/${product.Id}`;

    return this.http.put(url, product);
  }

  delete(id: number): Observable<any> {
    const url = `${this._authService.apiAuthBaseURL}/api/Products/${id}`;

    return this.http.delete(url);
  }

  add(product: Product) {
    const url = `${this._authService.apiAuthBaseURL}/api/Products`;

    return this.http.post(url, product);
  }


  getAllTypeProduct(): Observable<Array<TypeProduct>> {
    const url = `${this._authService.apiAuthBaseURL}/api/TypeProducts`;

    return this.http.get<Array<TypeProduct>>(url);
  }
}
