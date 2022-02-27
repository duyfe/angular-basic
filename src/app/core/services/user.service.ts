import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service'
import { User, UserLoginResponse, UserLogin } from '../models';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private currentUser$ = new BehaviorSubject<User>({} as User)
  public currentUser = this.currentUser$.asObservable().pipe(distinctUntilChanged())

  private isAuthenticated$ = new ReplaySubject<boolean>(0)
  public isAuthenticated = this.isAuthenticated$.asObservable()

  constructor(
    private _http: HttpClient,
    private _jwtService: JwtService,
    private _apiService: ApiService
  ) { }

  populate () {
    if(this._jwtService.getToken()) {
      console.log(this._jwtService.getToken());
      
      this._apiService.get('/users/1')
        .subscribe({
          next: (data) => this.setAuth({user: data, accessToken: ''}),
          error: () => this.purgeAuth()
        })
    } else {
      this.purgeAuth()
    }
  }

  setAuth(data: UserLoginResponse) {
    // Save JWT sent from server in localstorage
    if(data.accessToken) {
      this._jwtService.saveToken(data.accessToken);
    }
    // Set current user data into observable
    this.currentUser$.next(data.user);
    // Set isAuthenticated to true
    this.isAuthenticated$.next(true);
  }

  purgeAuth() {
    console.log('destroy token');
    
    // Remove JWT from localstorage
    this._jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUser$.next({} as User);
    // Set auth status to false
    this.isAuthenticated$.next(false);
  }

  login (postData: UserLogin) {
    return this._apiService.post('/users/signin', postData)
  }
}
