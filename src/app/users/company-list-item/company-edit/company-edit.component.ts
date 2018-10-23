import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompaniesService } from '../../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  @Input() company;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  editForm: FormGroup;
  subcompanies: any[];
  isShownNewCompany = false;

  constructor(
    private companiesService: CompaniesService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      'title': [this.company.title, Validators.required],
      'discount': [this.company.discount, Validators.required],
      'bonusPercentage': [this.company.bonusPercentage, Validators.required]
    });
    this.subcompanies = this.company.subcompanies;
  }
  
  get title() { return this.editForm.get('title'); }
  get discount() { return this.editForm.get('discount'); }
  get bonusPercentage() { return this.editForm.get('bonusPercentage'); }

  get requiredTitleError() { return this.title.hasError('required') && this.title.touched; }
  get requiredDiscountError() { return this.discount.hasError('required') && this.discount.touched; }
  get requiredBonusPercentageError() { return this.bonusPercentage.hasError('required') && this.bonusPercentage.touched; }

  save() {
    if (this.editForm.valid) {
      const body = Object.assign({}, this.editForm.value, {subcompanies: this.subcompanies});
      this.companiesService.update(this.company._id, body);
      this.isClosed.emit();
    }
  }

  cancel() {
    this.restore();
    this.isClosed.emit();
  }

  restore() {
    this.editForm.controls['title'].setValue(this.company.title);
    this.editForm.controls['discount'].setValue(this.company.discount);
    this.editForm.controls['bonusPercentage'].setValue(this.company.bonusPercentage);
    this.subcompanies = this.company.subcompanies;
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
}
