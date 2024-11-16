import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductAddComponent } from '../modal/product-add.component';
import { IProductResponseItem } from '../../../../shared/models/product.model';
import { AppState } from '../../../../store';
import { Store } from '@ngrx/store';

import { deleteProduct } from '../../../../store/product/product.actions';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import {
  IPagination,
  IProductResponse,
  ISearchParams,
} from 'src/app/shared/models/global.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  pagination: IPagination = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  };
  products$ = new BehaviorSubject<IProductResponseItem[]>([]);
  selectedProductIds: number[] = [];

  constructor(
    private modalService: NgbModal,
    private store: Store<AppState>,
    private productService: ProductsService
  ) {
    // this.products$ = this.store.select(selectAllProducts);
  }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(searchParams?: ISearchParams) {
    const params = {
      ...(searchParams?.searchText &&
        searchParams.searchText !== '' && {
          searchText: searchParams.searchText,
        }),
      ...(searchParams?.categoryId &&
        searchParams.categoryId !== '' && {
          categoryId: searchParams.categoryId,
        }),
      ...(searchParams?.priceFrom &&
        searchParams.priceFrom !== '' && { priceFrom: searchParams.priceFrom }),
      ...(searchParams?.priceTo &&
        searchParams.priceTo !== '' && { priceTo: searchParams.priceTo }),
      ...(searchParams?.stock &&
        searchParams.stock !== '' && { stock: searchParams.stock }),
      pageNumber: this.pagination.currentPage.toString(),
      pageSize: this.pagination.pageSize.toString(),
    };

    this.productService.getProductsWithFilter(params).subscribe({
      next: (res: IProductResponse) => {

        this.products$.next(res.items)
        this.pagination.totalItems = res.total;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
  onPageChange(page: number) {
    this.pagination.currentPage = page;
    this.loadProducts();
  }
  onDeleteProduct(productId: number): void {
    this.productService.deleteProducts([productId]).subscribe({
      next: () => {
        this.loadProducts();
      },
    });
    // this.store.dispatch(deleteProduct({ productId }));
  }

  onDeleteSelectedProducts(): void {
    // this.selectedProductIds.forEach((productId) => {
    //   this.store.dispatch(deleteProduct({ productId }));
    // });



  }

  onProductsSelected(productIds: number[]): void {
    this.selectedProductIds = productIds;
  }

  onBatchDelete(): void {
    if(this.selectedProductIds.length>0){
      this.productService.deleteProducts(this.selectedProductIds).subscribe({
        next: () => {
          this.loadProducts();
          this.selectedProductIds = [];
        },
      });
    }

    // this.selectedProductIds.forEach((productId) => {
    //   this.store.dispatch(deleteProduct({ productId }));
    // });
    // this.selectedProductIds = [];
  }

  onSearch(searchParams: ISearchParams): void {
    this.loadProducts(searchParams);
  }

  onReloadProducts(){

      this.loadProducts();
    // this.productService.insertProduct(productData).subscribe({
    //   next: () => {
    //     this.loadProducts();
    //   },
    // });
  }

  showModalAddProduct() {
    const addModalRef = this.modalService.open(ProductAddComponent, {
      size: 'lg',
      centered: true,
    });
    addModalRef.componentInstance.data = { name: 'World' };
  }
}
