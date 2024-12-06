import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {OrdersListComponent} from "./components/orders-list/orders-list.component";


const routes: Routes = [
  {path: '', component: OrdersListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class OrdersRoutingModule {
}
