import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { UserInfoComponent } from './user-list-item/user-info/user-info.component';
import { UserDeleteComponent } from './user-list-item/user-delete/user-delete.component';
import { UserEditComponent } from './user-list-item/user-edit/user-edit.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { CompanyListItemComponent } from './company-list-item/company-list-item.component';
import { CompanyInfoComponent } from './company-list-item/company-info/company-info.component';
import { CompanyCreateComponent } from './company-create/company-create.component';
import { CompanyEditComponent } from './company-list-item/company-edit/company-edit.component';
import { CompanyDeleteComponent } from './company-list-item/company-delete/company-delete.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UserCreateComponent,
    UserListItemComponent,
    UserInfoComponent,
    UserDeleteComponent,
    UserEditComponent,
    CompanyEditComponent,
    CompanyDeleteComponent,
    CompanyListItemComponent,
    CompanyInfoComponent,
    CompanyCreateComponent
  ]
})
export class UsersModule { }
