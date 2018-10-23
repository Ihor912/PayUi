import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-list-item',
  templateUrl: './company-list-item.component.html',
  styleUrls: ['./company-list-item.component.css']
})
export class CompanyListItemComponent implements OnInit {
  @Input() company;
  isShownCompanyInfo = false;
  isShownEditModal = false;
  isShownDeleteModal = false;

  constructor() { }

  ngOnInit() {
  }

  collapse() {
    this.isShownCompanyInfo = !this.isShownCompanyInfo;
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
