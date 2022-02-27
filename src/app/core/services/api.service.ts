import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { JwtService } from './jwt.service';

import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private _http: HttpClient,
    private _jwtService: JwtService
  ) {}

  private formatErrors (error: any) {
    return throwError(() => error.error)
  }

  get (path: string, params: HttpParams = new HttpParams(), options: Object = {}): Observable<any> {
    return this._http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors))
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this._http.patch(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
    ).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this._http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    return this._http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this._http.delete(
      `${environment.api_url}${path}`,
    ).pipe(catchError(this.formatErrors));
  }
}
