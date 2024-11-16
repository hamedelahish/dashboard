import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IProduct, IProductResponseItem} from "../../../../shared/models/product.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductAddComponent} from "../modal/product-add.component";
import { IPagination } from 'src/app/shared/models/global.model';


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  @Input() products: IProductResponseItem[];
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

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  onPageChanged(pageIndex: number): void {
    this.pagination.currentPage = pageIndex;
    this.onPageChange.emit(pageIndex);
  }

  onDeleteProduct(productId: number): void {
    this.productDeleted.emit(productId);

  }

  toggleSelection(productId: number): void {
    if (this.selectedProducts.has(productId)) {
      this.selectedProducts.delete(productId);
    } else {
      this.selectedProducts.add(productId);
    }
    this.productsSelected.emit(Array.from(this.selectedProducts));

  }

  toggleAllSelection(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if(this.products.length===0){
      (event.target as HTMLInputElement).checked = false;
      return;
    }
          if (isChecked) {
        this.products.forEach(product => this.selectedProducts.add(product.productId));
      } else {
        this.selectedProducts.clear();
      }
      this.productsSelected.emit(Array.from(this.selectedProducts));


    // this.products$.subscribe(products => {
    //   if (products.length === 0) {
    //     (event.target as HTMLInputElement).checked = false;
    //     return;
    //   }
    //   if (isChecked) {
    //     products.forEach(product => this.selectedProducts.add(product.id));
    //   } else {
    //     this.selectedProducts.clear();
    //   }
    //   this.productsSelected.emit(Array.from(this.selectedProducts));

    // });
  }

  openModalEditProduct(product:IProductResponseItem) {
    const addModalRef = this.modalService.open(ProductAddComponent, {size: 'lg', centered: true});
    addModalRef.componentInstance.data = {isEditMode:true, product};
    addModalRef.componentInstance.onReloadProducts.subscribe(() => {
      this.onReloadProducts.emit();
  });

  }
}
