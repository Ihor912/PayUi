import { Component, OnInit, Input } from '@angular/core';
import { ModalsService, ModalName } from '../../core/services/modals.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() user;
  isShownUserInfo = false;
  isShownEditModal = false;
  isShownDeleteModal = false;

  constructor(private modalsService: ModalsService) { }

  ngOnInit() {
  }

  collapse() {
    this.isShownUserInfo = !this.isShownUserInfo;
  }

  showEditModal() {
    this.isShownEditModal = true;
  }

  showDeleteModal() {
    this.isShownDeleteModal = true;
  }

  closeModal() {
    this.isShownEditModal = false;
    this.isShownDeleteModal = false;
  }
}
