import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductsRoutingModule } from './products-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {DropdownMenusModule} from "../../_metronic/partials";
import { ProductAddComponent } from './components/modal/product-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {CategoryFilterComponent} from "./components/category-filter/category-filter.component";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {OverlayContainer, OverlayModule} from "@angular/cdk/overlay";





@NgModule({
  declarations: [
    ProductListComponent,
    ProductTableComponent,
    ProductFilterComponent,
    ProductAddComponent,
    CategoryFilterComponent

  ],
  imports: [
    OverlayModule,
    CommonModule,
    ProductsRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzTreeSelectModule,
    NzPaginationModule,

  ],

})
export class ProductsModule { }
