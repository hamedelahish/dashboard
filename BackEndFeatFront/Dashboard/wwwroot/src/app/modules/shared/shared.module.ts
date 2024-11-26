import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';

@NgModule({
  declarations: [CategoryFilterComponent, CategoryTreeComponent],
  imports: [CommonModule, FormsModule, NzTreeSelectModule,NzTreeModule],
  exports: [CategoryFilterComponent, CategoryTreeComponent, FormsModule],
})
export class SharedModule {}
