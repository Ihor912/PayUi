import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { ModalName, ModalsService } from '../../core/services/modals.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  createForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.createForm = this.fb.group({
      'fullName': ['', Validators.required],
      'phone': ['', Validators.required],
      // 'whatsApp': ['', Validators.required],
      // 'role': ['', Validators.required],
      'password': ['', Validators.required],
      'description': ['Комментарий', Validators.required],
      // 'discount': ['', Validators.required],
    });
  }
  get fullName() { return this.createForm.get('fullName'); }
  get phone() { return this.createForm.get('description'); }
  // get whatsApp() { return this.createForm.get('whatsApp'); }
  // get role() { return this.createForm.get('role'); }
  get password() { return this.createForm.get('password'); }
  get description() { return this.createForm.get('description'); }
  // get discount() { return this.createForm.get('discount'); }

  get requiredFullNameError() { return this.fullName.hasError('required') && this.fullName.touched; }
  get requiredPhoneError() { return this.phone.hasError('required') && this.phone.touched; }
  // get requiredWhatsAppError() { return this.whatsApp.hasError('required') && this.whatsApp.touched; }
  // get requiredRoleError() { return this.role.hasError('required') && this.role.touched; }
  get requiredPasswordError() { return this.password.hasError('required') && this.password.touched; }
  get requiredDescriptionError() { return this.description.hasError('required') && this.description.touched; }
  // get requiredDiscountError() { return this.discount.hasError('required') && this.discount.touched; }

  ngOnInit() {
  }

  save() {
    if (this.createForm.valid) {
      this.userService.createManager(this.createForm.value);
      this.reset();
      this.isClosed.emit(true);
    }
  }

  cancel() {
    this.reset();
    this.isClosed.emit(false);
  }

  reset() {
    this.createForm.controls['fullName'].setValue('');
    this.createForm.controls['phone'].setValue('');
    this.createForm.controls['password'].setValue('');
    this.createForm.controls['description'].setValue('Комментарий');
  }

}
