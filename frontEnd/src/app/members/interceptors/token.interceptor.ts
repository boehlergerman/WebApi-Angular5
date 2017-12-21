import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../common/services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public injector: Injector) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    const token = authService.user ?
      authService.user.access_token : '';

    request = request.clone({
      setHeaders: {
        'Content-Type' : 'application/json',
        'Api-Token': token,
        'Authorization': `Bearer ${token}`
      }
    });

    // Interceptor .NET
    // const authService = this.injector.get(AuthenticationService);
    // if (authService.user.access_token !== '') {
    //   const token = authService.user.access_token;
    //   request = request.clone({
    //     setHeaders: {
    //       'Api-Token': token,
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    // } else {
    //   if (authService.user.isToken) {
    //     request = request.clone({
    //       setHeaders: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       }
    //     });
    //   } else {
    //     request = request.clone({
    //       setHeaders: {
    //         'Content-Type': 'application/json',
    //       }
    //     });
    //   }
    // }



    return next.handle(request);

  }

}
