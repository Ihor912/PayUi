import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../models';
import { toast } from 'bulma-toast';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: Observable<User>;
  private _currentUser: BehaviorSubject<User>;
  public isAuthenticated: Observable<boolean>;
  private _isAuthenticated: ReplaySubject<boolean>;
  private dataStore: {
    currentUser: User;
    isAuthenticated: boolean;
  };

  constructor(private apiService: ApiService, private router: Router) {
    this.dataStore = { currentUser: {} as User, isAuthenticated: false };
    this._currentUser = new BehaviorSubject<User>({} as User);
    this.currentUser = this._currentUser.asObservable();
    this._isAuthenticated = new ReplaySubject<boolean>(1);
    this.isAuthenticated = this._isAuthenticated.asObservable();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      this.dataStore.isAuthenticated = true;
      this._isAuthenticated.next(Object.assign({}, this.dataStore).isAuthenticated);
    }
  }

  getAllUsers() {
    return this.apiService.get('/users')
      .pipe(map(response => response['data']));
  }

  getManagers() {
    return this.apiService.get('/users?role=manager')
      .pipe(map(response => response['data']));
  }

  getForwarders() {
    return this.apiService.get('/users?role=forwarder')
      .pipe(map(response => response['data']));
  }

  getClients() {
    return this.apiService.get('/users?role=client')
      .pipe(map(response => response['data']));
  }

  createManager(body) {
    this.apiService.post(`/users/createManager`, body)
      .pipe(map(response => response.data))
      .subscribe(data => {
        toast({
          message: `Менеджер ${data.fullName} был создан`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not create a manager'));
  }

  update(userId, body) {
    this.apiService.put(`/users/${userId}`, body)
      .pipe(map(response => response.data))
      .subscribe(data => {
        toast({
          message: `Профиль пользователя ${data.fullName} был обновлен`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not update user profile'));
  }

  delete(userId) {
    this.apiService.delete(`/users/${userId}`)
    .pipe(map(response => response.data))
    .subscribe(data => {
      toast({
        message: `Пользователь ${data.fullName} был удален`,
        type: 'is-success',
        duration: 4000,
        position: 'is-bottom is-right'
      });
    }, error => console.log('Could not delete user'));
  }

  login(body) {
    this.apiService.post('/superuser/signin', body).subscribe(resp => {
      this.dataStore.currentUser = resp.data;
      this._currentUser.next(Object.assign({}, this.dataStore).currentUser);
      this.dataStore.isAuthenticated = true;
      this._isAuthenticated.next(Object.assign({}, this.dataStore).isAuthenticated);
      localStorage.setItem('token', resp.data.token);
      this.router.navigateByUrl('/menu');
    }, error => console.log('Could not to sign in'));
  }

  logout() {
    this.dataStore.currentUser = {} as User;
    this._currentUser.next(Object.assign({}, this.dataStore).currentUser);
    this.dataStore.isAuthenticated = false;
    this._isAuthenticated.next(Object.assign({}, this.dataStore).isAuthenticated);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('phone');
    this.router.navigateByUrl('/login');
  }
}
