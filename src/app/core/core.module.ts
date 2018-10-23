import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  ApiService,
  CategoriesService,
  UserService,

} from './services';
import { ModalsService } from './services/modals.service';


@NgModule({ })
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ApiService,
        CategoriesService,
        ModalsService,
        UserService
      ]
    };
  }
}
