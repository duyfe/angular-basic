import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  ApiService,
  UserService,
  JwtService
} from './services'

import { HttpTokenInterceptor } from './interceptors';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    UserService,
    JwtService
  ],
  declarations: [],
})
export class CoreModule { }
