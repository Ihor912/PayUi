import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompaniesService } from '../../core/services';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  title = '';
  subcompanies = [];
  isShownNewCompany = false;

  constructor(
    private companiesService: CompaniesService,
  ) { }

  ngOnInit() {
  }

  showAddingCompany() {
    this.isShownNewCompany = true;
  }

  hideAddingCompany() {
    this.isShownNewCompany = false;
  }

  addSubcompany(title, address) {
    this.subcompanies.push({
      title: title,
      address: address
    });
    this.hideAddingCompany();
  }

  save() {
    const newCompany = {
      title: this.title,
      subcompanies: this.subcompanies
    };
    this.companiesService.create(newCompany);
    this.reset()
    this.isClosed.emit(true);
  }

  cancel() {
    this.reset();
    this.isClosed.emit(false);
  }

  reset() {
    this.title = '';
    this.subcompanies = [];
  }

}
