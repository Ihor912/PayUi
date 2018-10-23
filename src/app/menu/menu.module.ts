import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishCreateComponent } from './dish-create/dish-create.component';
import { DishItemComponent } from './dish-list/dish-item/dish-item.component';
import { DishEditComponent } from './dish-list/dish-item/dish-edit/dish-edit.component';
import { DishDeleteComponent } from './dish-list/dish-item/dish-delete/dish-delete.component';
import { CategoryItemComponent } from './category-list/category-item/category-item.component';
import { CategoryDeleteComponent } from './category-list/category-item/category-delete/category-delete.component';
import { CategoryEditComponent } from './category-list/category-item/category-edit/category-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { DishEditGalleryComponent } from './dish-list/dish-item/dish-edit/dish-edit-gallery/dish-edit-gallery.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MenuRoutingModule
  ],
  declarations: [
    MenuComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryDeleteComponent,
    DishListComponent,
    DishCreateComponent,
    DishItemComponent,
    DishEditComponent,
    DishDeleteComponent,
    CategoryItemComponent,
    DishEditGalleryComponent
  ]
})
export class MenuModule { }
