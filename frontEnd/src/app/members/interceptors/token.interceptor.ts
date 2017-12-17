import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../common/services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public injector: Injector) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    
    if (authService.user.access_token !== "") {
      const token = authService.user.access_token;
      request = request.clone({
        setHeaders: {
          'Api-Token': token,
          'Authorization': `Bearer ${token}`
        }
      });
    } else {
      console.log("entre else");
      request = request.clone({
        setHeaders: {
          'Content-Type': "application/x-www-form-urlencoded",
        }
      });
    }



    return next.handle(request);

  }

}
