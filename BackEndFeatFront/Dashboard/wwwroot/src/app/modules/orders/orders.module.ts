import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenusModule } from "../../_metronic/partials";
import { OrdersAddComponent } from './components/modal/orders-add.component';
import { OrdersFilterComponent } from './components/orders-filter/orders-filter.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OverlayModule } from "@angular/cdk/overlay";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersTableComponent,
    OrdersFilterComponent,
    OrdersAddComponent,
  ],
  imports: [

    OverlayModule,
    CommonModule,
    OrdersRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    ReactiveFormsModule,
    NzSelectModule,
    FormsModule,
    NzTreeSelectModule,
    NzPaginationModule,
    SharedModule


  ],

})
export class OrdersModule { }
