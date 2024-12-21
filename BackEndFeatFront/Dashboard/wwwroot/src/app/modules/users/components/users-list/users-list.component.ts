import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { DateService } from 'src/app/modules/shared/utils/date/date.service';
import {
  IPagination,
  ISearchUserParams,
  IUsersResponse
} from 'src/app/shared/models/global.model';
import { IUserResponseItem } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { UsersAddComponent } from '../modal/users-add/users-add.component';
import { ToastService } from '../../../shared/service/toast/toast.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  pagination: IPagination = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  };
  users$ = new BehaviorSubject<IUserResponseItem[]>([]);
  selectedProductIds: number[] = [];

  constructor(
    private modalService: NgbModal,
    private usersService: UsersService,
    private dateService: DateService,
    private toastService:ToastService
  ) {

  }
  ngOnInit(): void {
    this.loadUsers();
  }

  onSearch(searchParams: ISearchUserParams): void {
    this.loadUsers(searchParams);
  }
  loadUsers(searchParams?: ISearchUserParams) {
    const params = {
      ...(searchParams?.searchText &&
        searchParams.searchText !== '' && {
          fullName: searchParams.searchText,
        }),
      pageNumber: this.pagination.currentPage.toString(),
      pageSize: this.pagination.pageSize.toString(),
    };

    this.usersService.getAllUsers(params).subscribe({
      next: (res: IUsersResponse) => {
        this.users$.next(res.items);
        this.pagination.totalItems = res.total;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  onPageChange(page: number) {
    this.pagination.currentPage = page;
    this.loadUsers();
  }


      onDeleteUser(userId:number){
          this.usersService.deleteUser(userId).subscribe({
            next:(res)=>{
              this.onReload();
              this.toastService.showToast(
                'کاربر با موفقیت حذف شد',
                'حذف کاربر',
                'success'
              )
            }   ,
            error: (error) => {
              console.log('error', error);
            },
          })
      }


  onReload() {
    this.loadUsers();
  }

  showModalAddUser() {
    const addModalRef = this.modalService.open(UsersAddComponent, {
      size: 'lg',
      centered: true,
    });
    addModalRef.componentInstance.data = { name: 'World' };
    addModalRef.componentInstance.onReload.subscribe(() => {
      this.onReload()
  });

  }
}
