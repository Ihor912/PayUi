import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../core/services';
import { DishesService } from '../../core/services/dishes.service';
import { Subscription, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Dish, Category } from '../../core/models';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  dishes: Observable<Dish[]>;
  subscription: Subscription;
  isCategoryChosen = false;
  category: Category;
  isShownNewDishModal = false;

  constructor(
    private categoriesService: CategoriesService,
    private dishesService: DishesService,
  ) {
    this.dishes = this.dishesService.dishes;
    this.subscription = this.categoriesService.chosenCategory.subscribe(category => {
      this.isCategoryChosen = true;
      this.category = category;
      this.dishesService.getAll(category._id);
    });
  }

  ngOnInit() {
  }

  showNewDishModal() {
    this.isShownNewDishModal = true;
  }

  closeModal() {
    this.isShownNewDishModal = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
