import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ICategorySelection} from "../../../../shared/models/category.model";
import {CategoriesService} from "../../../../shared/services/categories/categories.service";
import {CategoryTreeComponent} from "../../../shared/category-tree/category-tree.component";
import {ToastService} from '../../../shared/service/toast/toast.service';
import {treeCollapseMotion} from "ng-zorro-antd/core/animation";
import {NzFormatEmitEvent} from "ng-zorro-antd/core/tree";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @ViewChild('categoryTreeComponent') categoryTreeComponent!: CategoryTreeComponent;
  @Output() categorySelected = new EventEmitter<number>();

  typeForm: FormGroup;
  insertCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  selectedCategoryId: number | null = null;
  isDraggable:boolean=false


  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, private toastService: ToastService) {
    this.typeForm = this.fb.group({
      selectTypeForm: ['add_category'],
    });

    this.insertCategoryForm = this.fb.group({
      selectedCategory: [null],
      name: [''],
      description: [''],
    });

    this.editCategoryForm = this.fb.group({
      selectedCategoryEdit: [null],
      nameEdit: [''],
      descriptionEdit: [''],
    });
  }

  ngOnInit(): void {
    this.typeForm.get('selectTypeForm')?.valueChanges.subscribe((value) => {
      this.categoryTreeComponent.clearValue();
      this.clearTreeSelection()
      this.isDraggable = value === 'edit_category';
    });
  }


  onCategorySelected(selection: ICategorySelection): void {

    this.selectedCategoryId = selection.id;
    this.insertCategoryForm.patchValue({selectedCategory: selection.title})
    this.editCategoryForm.patchValue({selectedCategoryEdit: selection.title})
    if (this.typeForm.get('selectTypeForm')?.value === 'edit_category') {
      const item = this.categoryTreeComponent.findCategoryById(selection.id)
      this.editCategoryForm.patchValue({nameEdit: item?.name})
      this.editCategoryForm.patchValue({descriptionEdit: item?.description})

    }
  }

  onSubmit(): void {
    if (this.insertCategoryForm.get('name')?.value === "") {
      this.toastService.showToast('عنوان دسته بندی درج نشده است', 'خطا', 'error')
    } else if (this.insertCategoryForm.get('description')?.value === "") {
      this.toastService.showToast('توضیحات دسته بندی درج نشده است', 'خطا', 'error')
    } else {
      const formData = new FormData();
      if (this.selectedCategoryId) {
        formData.append('parentId', this.selectedCategoryId.toString());
      }
      formData.append('name', this.insertCategoryForm.get('name')?.value);
      formData.append('description', this.insertCategoryForm.get('description')?.value);

      this.categoriesService.insertCategory(formData).subscribe({
        next: () => {
          this.categoryTreeComponent.clearValue();
          this.clearTreeSelection();
          this.onReset();
          this.toastService.showToast('دسته بندی با موفقیت انجام شد', 'افزودن', 'success')
        },
        error: (error) => {

            if(error.status===400){
              if(error.error.message){
                this.toastService.showToast(error.error.message, 'افزودن','error')

              }
            }
            else{

              this.toastService.showToast('ایجاد دسته بندی با خطا مواجه شد', 'افزودن', 'error')
            }


        }

      })
    }

  }


  onEditSubmit(): void {

    if (this.selectedCategoryId === null) {
      this.toastService.showToast(' دسته بندی انتخاب نشده است', 'خطا', 'error')
    } else if (this.editCategoryForm.get('nameEdit')?.value === "") {
      this.toastService.showToast('عنوان دسته بندی درج نشده است', 'خطا', 'error')
    } else if (this.editCategoryForm.get('descriptionEdit')?.value === "") {
      this.toastService.showToast('توضیحات دسته بندی درج نشده است', 'خطا', 'error')
    } else {
      const formData = new FormData();
      formData.append('categoryId', this.selectedCategoryId.toString());
      formData.append('name', this.editCategoryForm.get('nameEdit')?.value);
      formData.append('description', this.editCategoryForm.get('descriptionEdit')?.value);

      this.categoriesService.updateCategory(formData).subscribe({
        next: () => {
          this.categoryTreeComponent.clearValue();
          this.clearTreeSelection();
          this.onResetEdit();
          this.toastService.showToast('دسته بندی با موفقیت ویرایش شد', 'ویرایش', 'success')

        },
        error: (error) => {
          console.error('Error inserting category:', error);
          this.toastService.showToast('ویرایش دسته بندی با خطا مواجه شد', ',ویرایش', 'error')
        }

      })
    }


  }

  onReset(): void {
    this.categoryTreeComponent.clearValue()
    this.insertCategoryForm.reset();
  }

  onResetEdit(): void {
    this.categoryTreeComponent.clearValue()
    this.editCategoryForm.reset();
  }

  clearTreeSelection(): void {
    this.selectedCategoryId = null;

    this.insertCategoryForm.patchValue({
      selectedCategory: null
    })
    this.editCategoryForm.patchValue({
      selectedCategoryEdit: null
    })

  }

  onRemove() {

    if (!this.selectedCategoryId) {
      this.toastService.showToast('دسته بندی انتخاب نشده است', ',حذف', 'error')

    } else {
      const formData = new FormData();
      if(this.selectedCategoryId){
        formData.append('categoryId', this.selectedCategoryId.toString());
      }
      this.categoriesService.removeCategory(formData).subscribe({
        next: () => {
          this.categoryTreeComponent.clearValue();
          this.clearTreeSelection();
          this.onResetEdit();
          this.toastService.showToast('دسته بندی با موفقیت حذف شد', 'حذف', 'success')

        },
        error: (error: any) => {
          console.error('Error removing category:', error);
          this.toastService.showToast(error.error.error, 'حذف', 'error')
        }

      })
    }

  }

  toggleDraggable(value:boolean) {
    this.isDraggable=value
  }

  onDrop(event: NzFormatEmitEvent): void {
    console.log('onDrop Parent ')
    this.isDraggable=false
  }

  protected readonly treeCollapseMotion = treeCollapseMotion;
}
