import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-orders-filter',
  templateUrl: './orders-filter.component.html',
  styleUrls: ['./orders-filter.component.scss'],
})
export class OrdersFilterComponent implements OnInit {
  @Output() showModalDetails = new EventEmitter();
  @Output() batchDelete = new EventEmitter<void>();
  @Output() searchProducts = new EventEmitter<any>();
  selectedCategory: number | null = null;
  searchForm: FormGroup;
  showFilterSection: boolean = false;
  startDate = new FormControl('');
  endDate = new FormControl('');
  

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      customerName: [''],
      startDate: [''],
      endDate: [''],
      statusName: [''],
   
    
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

  onShowModalDetails() {
    this.showModalDetails.emit();
  }

  setDateReturn(e: any) {
    console.log(e);
  }

  dpickerFocus(picker: { open: () => void; }) {
    picker.open();
  }
}
