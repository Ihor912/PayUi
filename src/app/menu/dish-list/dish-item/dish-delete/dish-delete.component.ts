import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../../../core/models';
import { DishesService } from '../../../../core/services/dishes.service';

@Component({
  selector: 'app-dish-delete',
  templateUrl: './dish-delete.component.html',
  styleUrls: ['./dish-delete.component.css']
})
export class DishDeleteComponent implements OnInit {
  @Input() dish: Dish;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dishesService: DishesService) {
  }

  ngOnInit() {
  }

  confirm() {
    this.dishesService.delete(this.dish._id);
    this.isClosed.emit();
  }

  cancel() {
    this.isClosed.emit();
  }

}
