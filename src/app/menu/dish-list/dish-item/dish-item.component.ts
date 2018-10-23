import { Component, OnInit, Input } from '@angular/core';
import { ModalsService, ModalName } from '../../../core/services/modals.service';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-dishes-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})
export class DishItemComponent implements OnInit {
  @Input() dish;
  isShownEditModal = false;
  isShownDeleteModal = false;
  DEFAULT_IMAGE_URL = environment.DEFAULT_IMAGE_URL;

  constructor() {
  }

  ngOnInit() {
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
