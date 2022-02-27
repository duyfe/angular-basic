import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/';

import { User } from '../../core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false
  currentUser: User = {} as User

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._userService.isAuthenticated.subscribe({
      next: (isLoggedIn) => this.isAuthenticated = isLoggedIn
    })

    this._userService.currentUser.subscribe({
      next: user => this.currentUser = user
    })
  }

  logout () {
    this._userService.purgeAuth()
  }

}
