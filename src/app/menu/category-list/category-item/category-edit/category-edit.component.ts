import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() category: Category;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  editForm: FormGroup;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [this.category.title, Validators.required]
    });
  }

  get title() { return this.editForm.get('title'); }

  get requiredTitleError() { return this.title.hasError('required') && this.title.touched; }

  save() {
    if (this.editForm.valid) {
      const data = {
        title: this.title.value
      };
      this.categoriesService.update(this.category._id, data);
      this.isClosed.emit();
    }
  }

  cancel() {
    this.isClosed.emit();
  }
}
