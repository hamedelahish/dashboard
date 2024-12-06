import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
})
export class OrdersFilterComponent implements OnInit {
  @Output() showModalAddProduct = new EventEmitter();
  @Output() batchDelete = new EventEmitter<void>();
  @Output() searchProducts = new EventEmitter<any>();
  selectedCategory: number | null = null;
  searchForm: FormGroup;
  showFilterSection: boolean = false;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: [''],
      categoryId: [null],
      priceFrom: [null],
      priceTo: [null],
      stock: [null],
    });
  }

  onSearch(): void {
    this.searchProducts.emit(this.searchForm.value);
  }

  ngOnInit(): void {}

  onCategorySelected(categoryId: number): void {
    this.selectedCategory = categoryId;
    this.searchForm.patchValue({ categoryId: categoryId });
  }

  triggerBatchDelete(): void {
    this.batchDelete.emit();
  }

  toggleFilterSection(): void {
    this.showFilterSection = !this.showFilterSection;
  }

  onShowModalAddProduct() {
    this.showModalAddProduct.emit();
  }

  setDateReturn(e: any) {
    console.log(e);
  }

  dpickerFocus(picker: { open: () => void; }) {
    picker.open();
  }
}
