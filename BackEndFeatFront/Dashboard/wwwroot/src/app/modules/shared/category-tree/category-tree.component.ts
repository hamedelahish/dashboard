// category-tree.component.ts
import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzFormatEmitEvent, NzTreeNodeOptions} from 'ng-zorro-antd/core/tree';
import {ICategoriesResponse} from 'src/app/shared/models/global.model';
import {CategoriesService} from 'src/app/shared/services/categories/categories.service';
import {ICategory, ICategorySelection} from 'src/app/shared/models/category.model';
import {ToastService} from "../service/toast/toast.service";


@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.scss'],
})
export class CategoryTreeComponent implements OnInit {

  @Output() categorySelected = new EventEmitter<ICategorySelection>();
  @Output() nzDrop = new EventEmitter<NzFormatEmitEvent>()
  @Input() nzDraggable: boolean = false;


  categories: ICategoriesResponse[] = [];
  nodes: NzTreeNodeOptions[] = [];
  expandKeys: string[] = [];
  value: string | null = null;
  filteredNodes: NzTreeNodeOptions[] = [];
  selectedKeys: string[] = [];
  updatedCategories: any[] = [];

  constructor(private categoriesService: CategoriesService, private cdr: ChangeDetectorRef,private toastService: ToastService) {
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
        this.updatedCategories = [];

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
    console.log('Drag and drop event:', event, this.nodes);

    const node = event.node;
    const dragNode = event.dragNode!;
    const parentNode = dragNode.getParentNode();
    const siblingNodes = parentNode ? parentNode.getChildren() : this.nodes.map((node) => ({
      key: node.key,
      title: node.title,
      parentId: null,
      categoryOrder: node.categoryOrder ?? null,
      origin: node,
    }));
    const structuredDragNode = {
      key: dragNode.key,
      title: dragNode.origin.title,
      parentId: dragNode.origin.parentId,
      categoryOrder: dragNode.origin.categoryOrder,
      origin: dragNode.origin,
    };

    dragNode.origin.parentId = parentNode ? +parentNode.key : null;


    const originalIndex = siblingNodes.findIndex((n) => n.key === dragNode.key);
    if (originalIndex !== -1) {
      siblingNodes.splice(originalIndex, 1);
    }

    const targetIndex = siblingNodes.findIndex((n) => n.key === node?.key);

    if (dragNode.origin.categoryOrder < node?.origin.categoryOrder && dragNode.origin.parentId ===node?.origin.parentId ) {

      siblingNodes.splice(targetIndex + 1, 0, structuredDragNode);
    } else if (dragNode.origin.categoryOrder > node?.origin.categoryOrder && dragNode.origin.parentId ===node?.origin.parentId) {

      siblingNodes.splice(targetIndex, 0, structuredDragNode);
    }

    siblingNodes.forEach((n, index) => {
      n.origin.categoryOrder = index + 1;
    });


    this.updatedCategories = siblingNodes.map((node) => ({
      id: +node.key,
      parentId: node.origin.parentId,
      categoryOrder: node.origin.categoryOrder,
    }));

    setTimeout(() => {
      this.nzDrop.emit(event);
    }, 10);

    this.cdr.detectChanges();
    console.log('updatedCategories:', this.updatedCategories);
  }



  convertToTreeNodes(categories: ICategory[]): NzTreeNodeOptions[] {
    return categories.map((category) => this.mapCategoryToTreeNode(category));
  }


  clearValue() {
    this.selectedKeys = [];
    this.loadCategories()
  }

  mapCategoryToTreeNode(category: ICategory): NzTreeNodeOptions {
    return {
      title: category.name,
      description: category.description,
      parentId: category.parentId,
      categoryOrder: category.categoryOrder,
      key: category.id.toString(),
      expanded: true,
      children:
        category.children?.map((child) => this.mapCategoryToTreeNode(child)) ??
        [],
    };
  }

  saveCategoryOrderChanges(): void {
    if (this.checkCategoryDepth(this.updatedCategories)) {
        this.categoriesService.UpdateCategoriesOrder(this.updatedCategories).subscribe({
            next: (res: any) => {
                setTimeout(() => {
                    this.loadCategories();
                }, 10);
                this.toastService.showToast('ترتیب دسته بندی با موفقیت ویرایش شد ', 'Success');
            },
            error: (error: any) => {
                this.toastService.showToast('خطا در ویرایش ترتیب دسته بندی', 'Error');
            }
        });
    } else {
        this.toastService.showToast('عمق دسته‌بندی نمی‌تواند بیش از ۴ سطح باشد.', 'Error');
    }
  }

  checkCategoryDepth(categories: any[], depth: number = 0): boolean {
    if (depth > 4) return false; // Exceeds maximum depth
    for (const category of categories) {
        if (category.children && !this.checkCategoryDepth(category.children, depth + 1)) {
            return false; // Recursive check
        }
    }
    return true; // Valid depth
  }
}
