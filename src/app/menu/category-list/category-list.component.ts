import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from '../../core/services';
import { Category } from '../../core/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Observable<Category[]>;
  isShownNewCategoryModal = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories = this.categoriesService.categories;
    this.categoriesService.getAll();
  }

  showNewCategoryModal() {
    this.isShownNewCategoryModal = true;
  }

  closeModal() {
    this.isShownNewCategoryModal = false;
  }

  chooseCategory(category) {
    this.categoriesService.chooseCategory(category);
  }
}
