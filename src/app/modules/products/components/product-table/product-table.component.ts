import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IProduct} from "../../../../shared/models/product.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductAddComponent} from "../modal/product-add.component";


@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  @Input() products$: Observable<IProduct[]>;
  @Output() productDeleted = new EventEmitter<number>();
  @Output() productsSelected = new EventEmitter<number[]>();
  currentPage: number = 1;
  pageSize: number = 10;
  selectedProducts: Set<number> = new Set<number>();

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  onPageChange(pageIndex: number): void {
    this.currentPage = pageIndex;
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
    this.products$.subscribe(products => {
      if (products.length === 0) {
        (event.target as HTMLInputElement).checked = false;
        return;
      }
      if (isChecked) {
        products.forEach(product => this.selectedProducts.add(product.id));
      } else {
        this.selectedProducts.clear();
      }
      this.productsSelected.emit(Array.from(this.selectedProducts));

    });
  }

  openModalEditProduct(productId:number) {
    const addModalRef = this.modalService.open(ProductAddComponent, {size: 'lg', centered: true});
    addModalRef.componentInstance.data = {isEditMode:true, productId: productId};
  }
}
