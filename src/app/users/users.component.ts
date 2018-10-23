import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, CompaniesService } from '../core/services';
import { Subscription, Observable } from 'rxjs';
import { ModalsService, ModalName } from '../core/services/modals.service';
import { User } from '../core/models';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  managers: Observable<User[]>;
  forwarders: Observable<User[]>;
  clients: Observable<User[]>;
  companies: Observable<any[]>;
  currentCategory = 'managers';
  isShownNewUserModal = false;
  isShownNewCompanyModal = false;

  constructor(private userService: UserService, private companiesService: CompaniesService) {
    this.managers = this.userService.getManagers();
    this.forwarders = this.userService.getForwarders();
    this.clients = this.userService.getClients();
    this.companiesService.loadAll();
    this.companies = this.companiesService.companies;
  }

  changeCategory(newCategory: string) {
    this.currentCategory = newCategory;
  }

  ngOnInit() {
  }

  showNewUserModal() {
    this.isShownNewUserModal = true;
  }

  showNewCompanyModal() {
    this.isShownNewCompanyModal = true;
  }

  closeModal() {
    this.isShownNewUserModal = false;
    this.isShownNewCompanyModal = false;
  }
}
