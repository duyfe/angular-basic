import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  errorMessages: string = ''
  
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe({
      next: (isAuthenticated) => {
        if(isAuthenticated) this._router.navigateByUrl('/admin')
      }
    }) 
  }

  onSubmit () {
    const { value } = this.loginForm
    
    this._userService.login(value)
      .subscribe({
        next: (data) => {
          this.errorMessages = ''
          this._userService.setAuth(data)
        },
        error: (err) => {
          if(typeof err === 'string') {
            this.errorMessages = err
          }
          this._userService.purgeAuth()
        }
      })
    // console.log(this.loginForm.controls['email'].errors);
  }
}
