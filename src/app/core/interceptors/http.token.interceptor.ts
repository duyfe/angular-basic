import { Injectable } from '@angular/core';
import { JwtService } from '../services';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8',
    'Accept': 'application/json'
  })

  constructor(
    private _jwtService: JwtService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    const token = this._jwtService.getToken()
    
    if(!!token) {
      this.headers.set('Authorization', `Beare ${token}`)
    }

    const request = req.clone({ headers: this.headers });

    return next.handle(request);
  }
}
