import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const localToken = localStorage.getItem('angularTokenData');

    // Logging the token to debug
    console.log('Token from localStorage:', localToken);

    if (localToken) {
      // Check if token contains the required number of periods (.)
      const tokenParts = localToken.split('.');
      if (tokenParts.length === 3) {
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + localToken)
        });
      } else {
        console.error('Malformed token:', localToken);
      }
    } else {
      console.warn('No token found in localStorage.');
    }

    return next.handle(request);
  }
}
