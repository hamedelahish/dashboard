import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutngModule } from './categories-routng.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryListComponent


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutngModule,
    FormsModule,
    SharedModule

  ]
})
export class CategoriesModule { }
