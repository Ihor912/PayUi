import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
    this.createForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  get title() { return this.createForm.get('title'); }

  get requiredTitleError() { return this.title.hasError('required') && this.title.touched; }

  ngOnInit() {
  }

  create() {
    if (this.createForm) {
      const data = {
        title: this.title.value
      };
      this.categoriesService.create(data);
      this.createForm.reset();
      this.isClosed.emit();
    }
  }

  cancel() {
    this.createForm.reset();
    this.isClosed.emit();
  }
}
