import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CompaniesService } from '../../../core/services';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.css']
})
export class CompanyDeleteComponent implements OnInit {
  @Input() company: any;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
  }

  confirm() {
    this.companiesService.delete(this.company._id);
    this.isClosed.emit();
  }

  cancel() {
    this.isClosed.emit();
  }

}
