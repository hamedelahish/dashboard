import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./components/users-list/users-list.component";


const routes: Routes = [
  {path: '', component: UsersListComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class UsersRoutingModule {
}
