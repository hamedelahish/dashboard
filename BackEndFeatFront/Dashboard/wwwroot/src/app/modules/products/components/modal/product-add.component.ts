import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxImagesValidator } from '../../../../shared/validators/image-validators';
import { AppState } from '../../../../store';
import { Store } from '@ngrx/store';
import { selectProductById } from '../../../../store/product/product.selectors';
import {
  IProduct,
  IProductResponseItem,
} from '../../../../shared/models/product.model';
import {
  addProduct,
  updateProduct,
} from '../../../../store/product/product.actions';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import {

  IGalleryResponseItem,
  IGalleryUpdateDto,
} from 'src/app/shared/models/gallery-image.model';
import { GalleriesService } from 'src/app/shared/services/galleries/galleries.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  @Input() data: any;
  @Output() onReloadProducts: EventEmitter<void> = new EventEmitter<void>();
  productImagePreview: string | ArrayBuffer | null = null;
  galleryImagesPreview: string[] = [];
  isEditMode: boolean = false;
  galleryResponseList: IGalleryResponseItem[] = [];
  galleryUpdateList: IGalleryUpdateDto[] = [];

  productForm = new FormGroup({
    categoryId: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    stock: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    image: new FormControl('', Validators.required),
    gallery: new FormControl([], [Validators.required, maxImagesValidator(3)]),
  });

  constructor(
    private store: Store<AppState>,
    public activeModal: NgbActiveModal,
    private productService: ProductsService,
    private galleryService: GalleriesService
  ) {}

  ngOnInit() {
    if (this.data && this.data.product) {
      this.isEditMode = true;
      this.loadProduct(this.data.product);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = this.productForm.value;

      if (this.isEditMode) {
        const formData = new FormData();
        formData.append('productId', this.data.product.productId.toString());
        formData.append('categoryId', product.categoryId.toString());
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('stock', product.stock.toString());

        this.productService.updateProduct(formData).subscribe({
          next: () => {
            // if product image and gallries is file then add to insert list
            if (product.image instanceof File) {
              this.galleryUpdateList.push({
                productId: this.data.product.productId,
                galleryId: 0,
                galleryUrl: '',
                galleryFile: this.productForm.get('image')?.value,
                isDeleted: false,
                isMain: true,
              });
            }
            product.gallery.forEach((item) => {
              if (item instanceof File) {
                this.galleryUpdateList.push({
                  productId: this.data.product.productId,
                  galleryId: 0,
                  galleryUrl: '',
                  galleryFile: item,
                  isDeleted: false,
                  isMain: false,
                });
              }
            });

            if (this.galleryUpdateList.length > 0) {
              const updateFormData = new FormData();
              updateFormData.append('productId', this.data.product.productId.toString());
              this.galleryUpdateList.forEach((gallery, index) => {
                updateFormData.append(
                  `galleryList[${index}].GalleryId`,
                  gallery.galleryId.toString()
                );
                updateFormData.append(
                  `galleryList[${index}].GalleryUrl`,
                  gallery.galleryUrl
                );
                updateFormData.append(
                  `galleryList[${index}].IsMain`,
                  gallery.isMain.toString()
                );
                updateFormData.append(
                  `galleryList[${index}].IsDeleted`,
                  gallery.isDeleted.toString()
                );
                if (gallery.galleryFile) {
                  updateFormData.append(
                    `galleryList[${index}].GalleryFile`,
                    gallery.galleryFile
                  );
                } else {
                  updateFormData.append(
                    `galleryList[${index}].GalleryFile`,
                    ''
                  );
                }
              });

              this.galleryService.updateGallery(updateFormData).subscribe({
                next: () => {

                  this.onReloadProducts.emit();
                  this.activeModal.close('Save click');


                },
              });
            }
            else{
              this.onReloadProducts.emit();
              this.activeModal.close('Save click');
            }


          },
        });
      } else {
        const formData = new FormData();
        formData.append('categoryId', product.categoryId.toString());
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('stock', product.stock.toString());
        formData.append('image', product.image as File);
        product.gallery.forEach((file, index) => {
          formData.append(`gallery`, file as unknown as File);
        });

        this.productService.insertProduct(formData).subscribe({
          next: () => {

            this.activeModal.close('Save click');
          },
        });
      }
      this.onReloadProducts.emit();
      this.activeModal.close('Save click');
    } else {
      this.productForm.markAllAsTouched();
    }

  }

  onProductImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productImagePreview = reader.result;
        this.productForm.patchValue({ image: file });
        this.productForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  removeProductImage(productImageInput: HTMLInputElement) {


    //find galleryId By Name from productgalleries
    const galleryId = this.data.product.galleries.find(
      (item: IGalleryResponseItem) =>
        item.galleryUrl === (this.productForm.get('image')?.value as string)
    )?.galleryId;
    //add to gallery update list because its deleted
    if (galleryId) {
      this.galleryUpdateList.push({
        productId: this.data.product.id,
        galleryId: galleryId,
        galleryUrl: this.productForm.get('image')?.value as string,
        isDeleted: true,
        isMain: true,
      });
    }

    this.productImagePreview = null;
    this.productForm.patchValue({ image: null });
    this.productForm.get('image')?.updateValueAndValidity();
    productImageInput.value = '';
  }

  onGalleryImagesSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files && this.galleryImagesPreview.length + files.length <= 3) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.galleryImagesPreview.push(reader.result as string);
          const currentImages = this.productForm.value.gallery || [];
          this.productForm.patchValue({ gallery: [...currentImages, file] });
          this.productForm.get('gallery')?.updateValueAndValidity();
        };

        reader.readAsDataURL(file);
      }
    } else {
      this.productForm.get('gallery')?.setErrors({ maxImages: true });
    }
  }

  removeGalleryImage(index: number, galleryFileInput: HTMLInputElement) {
    // Find galleryId By Name from product galleries
    const galleryItem = this.productForm.get('gallery')?.value[index];
    if (galleryItem) {
      const galleryId = this.data.product.galleries.find(
        (item: IGalleryResponseItem) => item.galleryUrl === galleryItem.galleryUrl
      )?.galleryId;

      // Add to gallery update list because it's deleted
      if (galleryId) {
        this.galleryUpdateList.push({
          productId: this.data.product.id,
          galleryId: galleryId,
          galleryUrl: galleryItem.galleryUrl,
          isDeleted: true,
          isMain: false,
        });
      }
    }

    // Remove the image preview and update the form control
    this.galleryImagesPreview.splice(index, 1);
    const updatedImages = this.productForm.value.gallery || [];
    updatedImages.splice(index, 1);
    this.productForm.patchValue({ gallery: updatedImages });
    this.productForm.get('gallery')?.updateValueAndValidity();

    // Clear file input if there are no images left
    if (this.galleryImagesPreview.length === 0) {
      galleryFileInput.value = '';
    }
  }


  loadProduct(product: IProductResponseItem) {
   
    this.productForm.patchValue({
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.galleries.filter((item) => item.isMain === true)[0]
        .galleryUrl,
      gallery: product.galleries.filter((item) => item.isMain === false),
    });

    this.productImagePreview = ('assets/images/' +
      this.productForm.get('image')?.value) as string;
    this.galleryImagesPreview = this.productForm
      .get('gallery')
      ?.value.map(
        (image: { galleryUrl: string }) =>
          `assets/images/${image.galleryUrl}` as string
      );
  }

  getFormControl(name: string) {
    return this.productForm.get(name);
  }

  onCategorySelected($event: number) {
    this.productForm.patchValue({ categoryId: $event });
  }
}
