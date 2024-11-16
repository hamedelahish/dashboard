import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../shared/models/category.model';
import { selectAllCategories } from '../../../../store/category/category.selectors';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import {AppState} from "../../../../store";
import {Overlay} from "@angular/cdk/overlay";
import { ICategoriesResponse } from 'src/app/shared/models/global.model';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  @Input() initialCategoryId: number | null = null;
  @Output() categorySelected = new EventEmitter<number>();
  categories: ICategoriesResponse[]=[];
  nodes: NzTreeNodeOptions[] = [];
  expandKeys: string[] = [];
  value: string | null = null;

  constructor(
    private overlay: Overlay,
    private categoriesService: CategoriesService
  ) {

  }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories(){
    this.categoriesService.getCategories().subscribe((res:ICategoriesResponse[])=>{

      this.categories=res;
      this.nodes = this.convertToTreeNodes(this.categories);
      this.expandKeys = this.nodes.map(node => node.key);
    })
    if (this.initialCategoryId)
       {
        this.value = this.initialCategoryId.toString();
       }
  }

  onChange(value: string): void {
  
    this.categorySelected.emit(+value);
  }

  convertToTreeNodes(categories: ICategory[]): NzTreeNodeOptions[] {
    return categories.map(category => this.mapCategoryToTreeNode(category));
  }

  mapCategoryToTreeNode(category: ICategory): NzTreeNodeOptions {
    return {
      title: category.name,
      key: category.id.toString(),
      children: category.children?.map(child => this.mapCategoryToTreeNode(child)) ?? []
    };
  }
}
