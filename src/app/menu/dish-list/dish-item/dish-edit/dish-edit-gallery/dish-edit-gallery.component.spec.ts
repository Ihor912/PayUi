import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishEditGalleryComponent } from './dish-edit-gallery.component';

describe('DishEditGalleryComponent', () => {
  let component: DishEditGalleryComponent;
  let fixture: ComponentFixture<DishEditGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishEditGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishEditGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
