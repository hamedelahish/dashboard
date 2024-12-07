import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/modules/shared/service/toast/toast.service';
import { DateService } from 'src/app/modules/shared/utils/date/date.service';

import {
  IOrderResponse,
  IOrderResponseDetail,
  IOrderResponseItem,
} from 'src/app/shared/models/order.model';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit {
  @Input() data: any;
  @Output() onReloadOrders: EventEmitter<void> = new EventEmitter<void>();
  orderDetailData: IOrderResponseDetail;
  orderStatusesData: IOrderResponse[] = [];
  isDetailsExpanded = false;
  selectedStatus: number;

  constructor(
    public activeModal: NgbActiveModal,
    private orderService: OrdersService,
    private dateService: DateService,
    private toastService:ToastService
  ) {}

  ngOnInit() {
    if (this.data && this.data.order) {
      this.loadOrderDetail(this.data.order);
      this.loadOrderStatus();
    }
  }

  onSubmit() {}

  loadOrderStatus(){
    this.orderService.getOrderStatus().subscribe({
      next: (res: IOrderResponse[]) => {
        this.orderStatusesData=res
        setTimeout(() => {
          this.selectedStatus = this.orderDetailData.orderStatusId;
        }, 100);
        
      },
      error: (error) => {
        console.log('error', error);
      },
    })
  }

  loadOrderDetail(order: IOrderResponseItem) {
    console.log(order);
    this.orderService.getOrderDetails(order.orderId).subscribe({
      next: (res: IOrderResponseDetail) => {
        this.orderDetailData = res;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  convertToPersianDate(date: string): string {
    return this.dateService.ConvertToPersianDate(date);
  }
  
  toggleDetails() {
    this.isDetailsExpanded = !this.isDetailsExpanded;
  }

  updateOrderStatus(): void {
    if (this.selectedStatus) {
      this.orderService.updateOrderStatus(this.orderDetailData.orderId, this.selectedStatus).subscribe({
        next: (response) => {
          this.onReloadOrders.emit();
          this.toastService.showToast('وضعیت سفارش با موفقیت ویرایش شد', 'ویرایش', 'success')
        },
        error: (error) => {
          this.toastService.showToast('خطا در ویرایش وضعیت سفارش', 'خطا', 'error')

        },
      });
    } else {
      console.error('No status selected');
    }
  }
}
