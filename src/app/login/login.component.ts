import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  get requiredPasswordError() { return this.password.hasError('required') && this.password.touched; }

  get requiredUsernameError() { return this.username.hasError('required') && this.username.touched; }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.loginForm.value;
    this.userService.login(credentials);
  }
}
