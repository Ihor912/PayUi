import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdModule } from './md/md.module';
import { HeaderComponent, FooterComponent } from './layout';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MdModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    MdModule,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { }
