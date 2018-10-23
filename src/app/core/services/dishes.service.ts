import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Dish } from '../models';
import { toast } from 'bulma-toast';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  public dishes: Observable<Dish[]>;
  private _dishes: BehaviorSubject<Dish[]>;
  private dataStore: {
    dishes: Dish[]
  };

  constructor(private apiService: ApiService) {
    this._dishes = <BehaviorSubject<Dish[]>>new BehaviorSubject<Dish[]>([]);
    this.dishes = this._dishes.asObservable();
    this.dataStore = { dishes: [] };
  }

  getAll(categoryId) {
    this.apiService.get(`/dishes?categoryId=${categoryId}`)
      .pipe(map(response => response['data']))
      .subscribe(data => {
        this.dataStore.dishes = data;
        this._dishes.next(Object.assign({}, this.dataStore).dishes);
      }, error => console.log('Could not get dishes'));
  }

  create(body) {
    return this.apiService.post('/dishes', body)
      .pipe(map(response => response.data))
      .subscribe(data => {
        this.dataStore.dishes.push(data);
        this._dishes.next(Object.assign({}, this.dataStore).dishes);

        toast({
          message: `Десерт ${data.title} был создан`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not create dish'));
  }

  update(dishId, body) {
    this.apiService.put(`/dishes/${dishId}`, body)
      .pipe(map(response => response.data))
      .subscribe(data => {
        this.dataStore.dishes.forEach((d, i) => {
          if (d._id === data._id) { this.dataStore.dishes[i] = data; }
        });

        this._dishes.next(Object.assign({}, this.dataStore).dishes);

        toast({
          message: `Десерт ${data.title} был обновлен`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not update dish'));
  }

  // method update wasn't used because we don't need toast
  updateGallery(dishId, pictures) {
    return this.apiService.put(`/dishes/${dishId}`, {pictures: pictures})
      .pipe(map(response => response.data));
  }

  updateMainPhoto(dishId, photo) {
    return this.apiService.put(`/dishes/${dishId}`, {mainPhotoUrl: photo})
      .pipe(map(response => response.data));
  }

  delete(dishId) {
    this.apiService.delete(`/dishes/${dishId}`)
      .pipe(map(response => response.data))
      .subscribe(() => {
        let desertTitle;
        this.dataStore.dishes.forEach((d, i) => {
          if (d._id === dishId) {
            desertTitle = this.dataStore.dishes[i].title;
            this.dataStore.dishes.splice(i, 1);
          }
        });

        this._dishes.next(Object.assign({}, this.dataStore).dishes);

        toast({
          message: `Десерт ${desertTitle} был удален`,
          type: 'is-success',
          duration: 4000,
          position: 'is-bottom is-right'
        });
      }, error => console.log('Could not delete dish'));
  }
}
