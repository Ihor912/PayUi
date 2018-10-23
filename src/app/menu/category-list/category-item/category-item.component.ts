import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../core/models';
import { CategoriesService } from '../../../core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;
  @Output() isChosen: EventEmitter<Category> = new EventEmitter<Category>();
  isShownEditCategoryModal = false;
  isShownDeleteCategoryModal = false;
  chosenCategory: Observable<Category>;
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.chosenCategory = this.categoriesService.chosenCategory;
  }

  showEditCategoryModal() {
    this.isShownEditCategoryModal = true;
  }

  showDeleteCategoryModal() {
    this.isShownDeleteCategoryModal = true;
  }

  closeModal() {
    this.isShownEditCategoryModal = false;
    this.isShownDeleteCategoryModal = false;
  }

  choose() {
    this.isChosen.emit(this.category);
  }

}
