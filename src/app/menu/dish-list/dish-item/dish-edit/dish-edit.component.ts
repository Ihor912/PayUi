import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { DishesService } from '../../../../core/services/dishes.service';
import { Dish } from '../../../../core/models';

@Component({
  selector: 'app-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit {
  @Input() dish: Dish;
  @Input() isModalActive;
  @Output() isClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  editForm: FormGroup;
  fileName = 'Выберите файл';
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private dishesService: DishesService
  ) {
  }

  ngOnInit() {
    this.editForm = this.fb.group({
      'title': [this.dish.title, Validators.required],
      'description': [this.dish.description, Validators.required],
      'piecePrice': [this.dish.piecePrice, Validators.required],
      'totalPrice': [this.dish.totalPrice, Validators.required],
      'count': [this.dish.count, Validators.required],
      'mass': [this.dish.mass, Validators.required],
      'code': [this.dish.code, Validators.required],
    });
  }

  get title() { return this.editForm.get('title'); }
  get description() { return this.editForm.get('description'); }
  get piecePrice() { return this.editForm.get('piecePrice'); }
  get totalPrice() { return this.editForm.get('totalPrice'); }
  get count() { return this.editForm.get('count'); }
  get mass() { return this.editForm.get('mass'); }
  get code() { return this.editForm.get('code'); }

  get requiredTitleError() { return this.title.hasError('required') && this.title.touched; }
  get requiredDescriptionError() { return this.description.hasError('required') && this.description.touched; }
  get requiredPiecePriceError() { return this.piecePrice.hasError('required') && this.piecePrice.touched; }
  get requiredTotalPriceError() { return this.totalPrice.hasError('required') && this.totalPrice.touched; }
  get requiredCountError() { return this.count.hasError('required') && this.count.touched; }
  get requiredMassError() { return this.mass.hasError('required') && this.mass.touched; }
  get requiredCodeError() { return this.code.hasError('required') && this.code.touched; }

  save() {
    if (this.editForm.valid) {
      const data = Object.assign({}, this.editForm.value, {photoUrl: this.dish.mainPhotoUrl});
      this.dishesService.update(this.dish._id, data);
      this.isClosed.emit();
    }
  }

  cancel() {
    this.isClosed.emit();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.fileName = file.name;
    const filePath = `images/${this.fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            url => this.dish.mainPhotoUrl = url
          );
         } )
     )
    .subscribe();
  }
}
