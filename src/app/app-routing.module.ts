import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './core/services/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'menu', loadChildren: './menu/menu.module#MenuModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
