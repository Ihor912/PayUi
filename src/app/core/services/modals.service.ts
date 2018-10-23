import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum ModalName  {
  newDish,
  editDish,
  deleteDish,
  newCategory,
  editCategory,
  deleteCategory,
  newUser,
  editUser,
  deleteUser
}

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  modalTypeSource = new Subject();
  modalType$ = this.modalTypeSource.asObservable();

  modalDataSource = new Subject();
  modalData$ = this.modalDataSource.asObservable();

  constructor() { }

  addData(data) {
    this.modalDataSource.next(data);
  }

  show(modalName) {
    this.modalTypeSource.next(modalName);
  }

  close() {
    this.modalTypeSource.next(false);
    this.modalDataSource.next();
  }

}
