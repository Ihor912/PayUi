import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { CategoriesService } from '../../../../core/services';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  @Input() category: Category;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
  }

  confirm() {
    this.categoriesService.delete(this.category._id);
    this.isClosed.emit();
  }

  cancel() {
    this.isClosed.emit();
  }
}
