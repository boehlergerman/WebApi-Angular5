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
}
