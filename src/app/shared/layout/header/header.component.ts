import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services';
import { Observable } from 'rxjs';
import { User } from '../../../core/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  phone: string;
  isAuthenticated: Observable<boolean>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated;
    this.phone = localStorage.getItem('phone');
  }

  logout() {
    this.userService.logout();
  }
}
