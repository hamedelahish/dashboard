import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DateService } from 'src/app/modules/shared/utils/date/date.service';
import { IPagination } from 'src/app/shared/models/global.model';
import { IUserResponseItem } from 'src/app/shared/models/user.model';
import { UsersAddComponent } from "../modal/users-add/users-add.component";
import { UsersEditPasswordComponent } from '../modal/users-edit-password/users-edit-password.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @Input() users: IUserResponseItem[];
  @Output() onDeleteUser = new EventEmitter<number>();
  @Output() productsSelected = new EventEmitter<number[]>();
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onReload: EventEmitter<void> = new EventEmitter<void>()
  @Input() pagination: IPagination = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  };


  constructor(
    private modalService: NgbModal,
    private dateService: DateService
  
  ) {
  }

  ngOnInit(): void {

  }

  onPageChanged(pageIndex: number): void {
    this.pagination.currentPage = pageIndex;
    this.onPageChange.emit(pageIndex);
  }

  convertToPersianDate(date: string): string {
    return this.dateService.ConvertToPersianDate(date);
  }


  onDelete(userId: number): void {
    this.onDeleteUser.emit(userId);

  }

  openModalEdit(user:IUserResponseItem) {

    const addModalRef = this.modalService.open(UsersAddComponent, {size: 'lg', centered: true});
    console.log('Modal Component Instance:', addModalRef.componentInstance);
    addModalRef.componentInstance.data = {isEditMode:true, user};
    addModalRef.componentInstance.onReload.subscribe(() => {
      this.onReload.emit();
  });

  }
  

  openModalEditPassword(user:IUserResponseItem) {
  
    const addModalRef = this.modalService.open(UsersEditPasswordComponent, {size: 'md', centered: true});
    console.log('Modal Component Instance:', addModalRef.componentInstance);
    addModalRef.componentInstance.data = {isEditMode:true, user};
    addModalRef.componentInstance.onReload.subscribe(() => {
      this.onReload.emit();
  });

  }
}
