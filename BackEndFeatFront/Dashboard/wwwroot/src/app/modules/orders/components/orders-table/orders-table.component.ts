import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IPagination } from 'src/app/shared/models/global.model';
import { IOrderResponseItem } from 'src/app/shared/models/order.model';
import { IProductResponseItem } from "../../../../shared/models/product.model";
import { OrdersAddComponent } from "../modal/orders-add.component";
import { DateService } from 'src/app/modules/shared/utils/date/date.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  @Input() orders: IOrderResponseItem[];
  @Output() productDeleted = new EventEmitter<number>();
  @Output() productsSelected = new EventEmitter<number[]>();
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onReloadProducts: EventEmitter<void> = new EventEmitter<void>()
  @Input() pagination: IPagination = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  };


  selectedProducts: Set<number> = new Set<number>();

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
  openModalEditProduct(product:IProductResponseItem) {
    const addModalRef = this.modalService.open(OrdersAddComponent, {size: 'lg', centered: true});
    addModalRef.componentInstance.data = {isEditMode:true, product};
    addModalRef.componentInstance.onReloadProducts.subscribe(() => {
      this.onReloadProducts.emit();
  });


  }
}
