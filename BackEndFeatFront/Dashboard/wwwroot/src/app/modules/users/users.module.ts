
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from "ng-inline-svg-2";
import { DropdownMenusModule } from "../../_metronic/partials";
import { UsersAddComponent } from './components/modal/users-add/users-add.component';
import { UsersEditPasswordComponent } from './components/modal/users-edit-password/users-edit-password.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersRoutingModule } from './users-routing.module';
import { OverlayModule } from "@angular/cdk/overlay";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";
import { SharedModule } from '../shared/shared.module';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { UsersFilterComponent } from './components/users-filter/user-filter.component';





@NgModule({
  declarations: [
    UsersListComponent,
    UsersTableComponent,
    UsersAddComponent,
    UsersEditPasswordComponent,
    UsersFilterComponent
  ],
  imports: [
    NgPersianDatepickerModule,
    OverlayModule,
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule { }
