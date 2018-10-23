import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ModalName, ModalsService } from '../../../core/services/modals.service';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models';
import { UserService } from '../../../core/services';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  @Input() user: User;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  
  confirm() {
    this.userService.delete(this.user._id);
    this.isClosed.emit();
  }

  cancel() {
    this.isClosed.emit();
  }
}
