import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalName, ModalsService } from '../../../core/services/modals.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../core/models';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  editForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      'fullName': [this.user.fullName, Validators.required],
      'phone': [this.user.phone, Validators.required],
      'whatsApp': [this.user.whatsApp, Validators.required],
      'role': [this.user.role, Validators.required],
      'description': [this.user.description, Validators.required]
    });
  }

  get fullName() { return this.editForm.get('fullName'); }
  get phone() { return this.editForm.get('description'); }
  get whatsApp() { return this.editForm.get('whatsApp'); }
  get role() { return this.editForm.get('role'); }
  get description() { return this.editForm.get('description'); }

  get requiredFullNameError() { return this.fullName.hasError('required') && this.fullName.touched; }
  get requiredPhoneError() { return this.phone.hasError('required') && this.phone.touched; }
  get requiredWhatsAppError() { return this.whatsApp.hasError('required') && this.whatsApp.touched; }
  get requiredRoleError() { return this.role.hasError('required') && this.role.touched; }
  get requiredDescriptionError() { return this.description.hasError('required') && this.description.touched; }

  save() {
    if (this.editForm.valid) {
      this.userService.update(this.user._id, this.editForm.value);
      this.isClosed.emit();
    }
  }

  cancel() {
    this.restore();
    this.isClosed.emit();
  }

  restore() {
    this.editForm.controls['fullName'].setValue(this.user.fullName);
    this.editForm.controls['phone'].setValue(this.user.phone);
    this.editForm.controls['whatsApp'].setValue(this.user.whatsApp);
    this.editForm.controls['role'].setValue(this.user.role);
    this.editForm.controls['description'].setValue(this.user.description);
  }
}
