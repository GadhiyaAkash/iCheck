import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: { 
        Authorization: `Bearer ${this.authService.token}`
      }
    });
    return next.handle(request)
      .pipe(
        catchError(error => {
          switch (error.status) {
            case 401:
              // handle 401 error - redirect to login
              
              break;
            case 403:
              // handle 403 error
              break;
            default:
              break;
          }
          return throwError(error);
        })
      );
  }
}
