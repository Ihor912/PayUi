import { Injectable } from '@angular/core';
import { toast } from 'bulma-toast';
import { ApiService } from './api.service';

import { map } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';


@Injectable()
export class CategoriesService {
  public categories: Observable<Category[]>;
  private _categories: BehaviorSubject<Category[]>;
  public chosenCategory: Observable<Category>;
  private _chosenCategory: Subject<Category>;
  private dataStore: {
    categories: Category[],
    chosenCategory: Category
  };

  constructor(private apiService: ApiService) {
    this.dataStore = {
      categories: [],
      chosenCategory: {
        _id: null,
        title: null
      }
    };
    this._categories = <BehaviorSubject<Category[]>>new BehaviorSubject([]);
    this.categories = this._categories.asObservable();
    this._chosenCategory = new Subject<Category>();
    this.chosenCategory = this._chosenCategory.asObservable();
  }

  chooseCategory(category: Category) {
    this.dataStore.chosenCategory = category;
    this._chosenCategory.next(this.dataStore.chosenCategory);
  }

  public getAll() {
    this.apiService.get('/categories')
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.dataStore.categories = data;
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }, error => console.log('Could not get categories'));
  }

  public create(body) {
    this.apiService.post('/categories', body)
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.dataStore.categories.push(data);
        this._categories.next(Object.assign({}, this.dataStore).categories);
        toast({
          message: `Категория ${data.title} была создана`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not create category.'));
  }

  public delete(categoryId) {
    return this.apiService.delete(`/categories/${categoryId}`)
      .pipe(map(response => response['data']))
      .subscribe((data) => {
        let categoryTitle;
        this.dataStore.categories.forEach((c, i) => {
          if (c._id === categoryId) {
            categoryTitle = this.dataStore.categories[i].title;
            this.dataStore.categories.splice(i, 1);
          }
        });

        this._categories.next(Object.assign({}, this.dataStore).categories);

        toast({
          message: `Категория ${categoryTitle} была удалена`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });

        // clear dishes if deleted category is chosen
        if (this.dataStore.chosenCategory._id === categoryId) {
          this.dataStore.chosenCategory = {} as Category;
          this._chosenCategory.next(Object.assign({}, this.dataStore).chosenCategory);
        }
      }, error => console.log('Could not delete category'));
  }

  public update(categoryId, body) {
    this.apiService.put(`/categories/${categoryId}`, body)
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.dataStore.categories.forEach((c, i) => {
          if (c._id === data._id) { this.dataStore.categories[i] = data; }
        });

        this._categories.next(Object.assign({}, this.dataStore).categories);

        toast({
          message: `Категория ${data.title} была обновлена`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not update category'));
  }

}
