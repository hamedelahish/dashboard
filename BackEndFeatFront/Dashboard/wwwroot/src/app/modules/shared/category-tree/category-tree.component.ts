// category-tree.component.ts
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef, ViewChild
} from '@angular/core';
import {NzTreeNodeOptions, NzFormatEmitEvent} from 'ng-zorro-antd/core/tree';
import {ICategoriesResponse} from 'src/app/shared/models/global.model';
import {CategoriesService} from 'src/app/shared/services/categories/categories.service';
import {ICategory, ICategorySelection} from 'src/app/shared/models/category.model';


@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit {

  @Output() categorySelected = new EventEmitter<ICategorySelection>();


  categories: ICategoriesResponse[] = [];
  nodes: NzTreeNodeOptions[] = [];
  expandKeys: string[] = [];
  value: string | null = null;
  filteredNodes: NzTreeNodeOptions[] = [];
  selectedKeys: string[] = [];

  constructor(private categoriesService: CategoriesService,private cdr :ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }


  loadCategories(): void {
    this.categoriesService
      .getCategories()
      .subscribe((res: ICategoriesResponse[]) => {
        this.categories = res;
        this.nodes = this.convertToTreeNodes(this.categories);
        this.expandKeys = this.nodes.map((node) => node.key);
        this.cdr.detectChanges()


      });
  }
  findCategoryById(id: number): ICategory | undefined {
    const search = (categories: ICategory[]): ICategory | undefined => {
      for (const category of categories) {
        if (category.id === id) {
          return category;
        }
        if (category.children && category.children.length > 0) {
          const result = search(category.children);
          if (result) {
            return result;
          }
        }
      }
      return undefined;
    };

    return search(this.categories);
  }

  onClick(value: NzFormatEmitEvent): void {
    if (value && value.node) {
      const selectedCategory: ICategorySelection = {title: value.node.origin.title, id: +value.node.key};
      this.categorySelected.emit(selectedCategory);
    }
  }

  onSearch(searchText: string): void {
    if (!searchText) {
      this.filteredNodes = [...this.nodes];
      return;
    }
    this.filteredNodes = this.nodes.filter((node) =>
      node.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  onDrop(event: NzFormatEmitEvent): void {
    console.log('Drag and drop event:', event);

  }

  convertToTreeNodes(categories: ICategory[]): NzTreeNodeOptions[] {
    return categories.map((category) => this.mapCategoryToTreeNode(category));
  }


  clearValue(){
    this.selectedKeys = [];
    this.loadCategories()
  }
  mapCategoryToTreeNode(category: ICategory): NzTreeNodeOptions {
    return {
      title: category.name,
      description: category.description,
      key: category.id.toString(),
      children:
        category.children?.map((child) => this.mapCategoryToTreeNode(child)) ??
        [],
    };
  }


}
