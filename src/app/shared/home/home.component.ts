import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from '../../core/services/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
