import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import {
  IOrdersResponse,
  IPagination,
  ISearchOrderParams,
  ISearchParams
} from 'src/app/shared/models/global.model';
import { IOrderResponseItem } from 'src/app/shared/models/order.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';
import { AppState } from '../../../../store';
import { OrdersDetailComponent } from '../modal/orders-detail.component';
import { DateService } from 'src/app/modules/shared/utils/date/date.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent {
  pagination: IPagination = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  };
  orders$ = new BehaviorSubject<IOrderResponseItem[]>([]);
  selectedProductIds: number[] = [];

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private ordersService: OrdersService,
    private dateService: DateService
  ) {
    // this.products$ = this.store.select(selectAllProducts);
  }
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(searchParams?: ISearchOrderParams) {
    const params = {
      ...(searchParams?.customerName &&
        searchParams.customerName !== '' && {
          customerName: searchParams.customerName,
        }),
      ...(searchParams?.startDate &&
        searchParams.startDate !== '' && {
          startDate: this.dateService.ConvertToGregorianDate(searchParams.startDate),
        }),
      ...(searchParams?.endDate &&
        searchParams.endDate !== '' && { endDate: this.dateService.ConvertToGregorianDate(searchParams.endDate) }),
      ...(searchParams?.statusName &&
        searchParams.statusName !== '' && { statusName: searchParams.statusName }),
      pageNumber: this.pagination.currentPage.toString(),
      pageSize: this.pagination.pageSize.toString(),
    };

    this.ordersService.getOrdersWithFilter(params).subscribe({
      next: (res: IOrdersResponse) => {
        this.orders$.next(res.items);
        this.pagination.totalItems = res.total;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  onPageChange(page: number) {
    this.pagination.currentPage = page;
    this.loadOrders();
  }



  onSearch(searchParams: ISearchParams): void {
    this.loadOrders(searchParams);
  }

  onReloadOrders() {
    this.loadOrders();
  }

  showModalOrderDetail() {
    const addModalRef = this.modalService.open(OrdersDetailComponent, {
      size: 'lg',
      centered: true,
    });
    addModalRef.componentInstance.data = { name: 'World' };
  }
}
