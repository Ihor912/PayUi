import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../../../../../core/models';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { DishesService } from '../../../../../core/services/dishes.service';

@Component({
  selector: 'app-dish-edit-gallery',
  templateUrl: './dish-edit-gallery.component.html',
  styleUrls: ['./dish-edit-gallery.component.css']
})
export class DishEditGalleryComponent implements OnInit {
  @Input() dish: Dish;
  previewFile: any;
  previewUrl: any;
  chosenPicture: any;

  constructor(private storage: AngularFireStorage, private dishesService: DishesService) { }

  ngOnInit() {
  }

  readUrl(event:any) {
    this.previewFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.previewUrl = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  upload() {
    console.log('Upload function')
    const filePath = `images/${this.previewFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.previewFile);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.dish.pictures.push(url);
          this.dishesService.updateGallery(this.dish._id, this.dish.pictures).subscribe(dish => {
            this.dish = dish;
            this.previewFile = undefined;
            this.previewUrl = undefined;
          })
        });
      })
    )
    .subscribe();
  }

  choosePicture(picture) {
    this.chosenPicture = picture;
  }

  makeMain(photo) {
    this.dishesService.updateMainPhoto(this.dish._id, photo).subscribe(dish => this.dish = dish);
  }

}
