import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  @Output() showModalAddUser = new EventEmitter();
  @Output() search = new EventEmitter<any>();

  searchForm: FormGroup;
  showFilterSection: boolean = false;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchText: [''],
     
    });
  }

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }

  ngOnInit(): void {}


 
  toggleFilterSection(): void {
    this.showFilterSection = !this.showFilterSection;
  }

  onShowModalAddProduct() {
    this.showModalAddUser.emit();
  }
}
