import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductAddComponent} from "../modal/product-add.component";
import {IProduct} from "../../../../shared/models/product.model";
import {Observable} from "rxjs";
import {AppState} from "../../../../store";
import {Store} from "@ngrx/store";
import {selectAllProducts, selectFilteredProducts} from "../../../../store/product/product.selectors";
import {deleteProduct} from "../../../../store/product/product.actions";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products$: Observable<IProduct[]>;
  selectedProductIds: number[] = [];


  constructor(
    private modalService: NgbModal, private store: Store<AppState>,) {
    this.products$ = this.store.select(selectAllProducts);
  }

  onDeleteProduct(productId: number): void {
    this.store.dispatch(deleteProduct({productId}));

  }

  onDeleteSelectedProducts(): void {
    this.selectedProductIds.forEach(productId => {
      this.store.dispatch(deleteProduct({productId}));
    });

    this.selectedProductIds = [];
  }

  onProductsSelected(productIds: number[]): void {
    this.selectedProductIds = productIds;
  }

  onBatchDelete(): void {
    this.selectedProductIds.forEach(productId => {
      this.store.dispatch(deleteProduct({productId}));
    });
    this.selectedProductIds = [];
  }

  onSearch(searchParams: any): void {
    console.log('searchParams',searchParams)
    this.products$ = this.store.select(selectFilteredProducts(searchParams));
    this.products$.subscribe(products => {
      console.log('products$:', products); // Debug log

    });

  }

  showModalAddProduct() {
    const addModalRef = this.modalService.open(ProductAddComponent, {size: 'lg', centered: true});
    addModalRef.componentInstance.data = {name: 'World'}
  }
}
