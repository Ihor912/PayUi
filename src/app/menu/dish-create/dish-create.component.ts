import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ModalsService, ModalName } from '../../core/services/modals.service';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Dish } from '../../core/models';
import { DishesService } from '../../core/services/dishes.service';

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit {
  @Input() category;
  @Input() isModalActive;
  @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private dishesService: DishesService
  ) {
    this.createForm = this.fb.group({
      'title': ['', Validators.required],
      'description': ['', Validators.required],
      'piecePrice': ['', Validators.required],
      'totalPrice': ['', Validators.required],
      'count': ['', Validators.required],
      'mass': ['', Validators.required],
      'code': ['', Validators.required],
    });
  }

  get title() { return this.createForm.get('title'); }
  get description() { return this.createForm.get('description'); }
  get piecePrice() { return this.createForm.get('piecePrice'); }
  get totalPrice() { return this.createForm.get('totalPrice'); }
  get count() { return this.createForm.get('count'); }
  get mass() { return this.createForm.get('mass'); }
  get code() { return this.createForm.get('code'); }

  get requiredTitleError() { return this.title.hasError('required') && this.title.touched; }
  get requiredDescriptionError() { return this.description.hasError('required') && this.description.touched; }
  get requiredPiecePriceError() { return this.piecePrice.hasError('required') && this.piecePrice.touched; }
  get requiredTotalPriceError() { return this.totalPrice.hasError('required') && this.totalPrice.touched; }
  get requiredCountError() { return this.count.hasError('required') && this.count.touched; }
  get requiredMassError() { return this.mass.hasError('required') && this.mass.touched; }
  get requiredCodeError() { return this.code.hasError('required') && this.code.touched; }

  ngOnInit() {
  }

  save() {
    if (this.createForm.valid) {
      const body = Object.assign({}, this.createForm.value,
        {categoryId: this.category._id},
      );
      console.log('dish, ', body);
      this.dishesService.create(body);
      this.createForm.reset();
      this.isConfirmed.emit(true);
    }
  }

  cancel() {
    this.createForm.reset();
    this.isConfirmed.emit(false);
  }
}
