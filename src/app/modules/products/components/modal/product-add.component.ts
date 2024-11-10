import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {maxImagesValidator} from "../../../../shared/validators/image-validators";
import {AppState} from "../../../../store";
import {Store} from "@ngrx/store";
import {selectProductById} from "../../../../store/product/product.selectors";
import {IProduct} from "../../../../shared/models/product.model";
import {addProduct, updateProduct} from "../../../../store/product/product.actions";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  @Input() data: any;
  productImagePreview: string | ArrayBuffer | null = null;
  galleryImagesPreview: string[] = [];
  isEditMode: boolean = false;

  productForm = new FormGroup({
    category: new FormControl('', Validators.required),
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    stock: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    image: new FormControl('', Validators.required),
    gallery: new FormControl([], [Validators.required, maxImagesValidator(3)])
  });

  constructor(
    private store: Store<AppState>,
    public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    if (this.data && this.data.productId) {
      this.isEditMode = true;
      this.loadProduct(this.data.productId);
    }
  }



  onSubmit() {
    if (this.productForm.valid) {
      const product: IProduct = this.productForm.value;
    console.log('product',product)
      const productImageFileName =  (product.image as File).name;

      const galleryImages = product.gallery.map((file, index) => {
        const fileName= (file as unknown as File).name
        return {
          id: index+1,
          url: fileName
        }
      });

      // Add the transformed galleryImages and productImageFileName to the product object
      const transformedProduct = {
        ...product,
        image: productImageFileName,
        gallery: galleryImages
      };

      console.log('product', transformedProduct);

      if (this.isEditMode) {
        this.store.dispatch(updateProduct({ product: transformedProduct }));
      } else {
        this.store.dispatch(addProduct({ product: transformedProduct }));
      }
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
        this.productForm.patchValue({image: file})
        this.productForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file)
    }

  }

  removeProductImage(productImageInput: HTMLInputElement) {
    this.productImagePreview = null;
    this.productForm.patchValue({image: null})
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
          const currentImages = this.productForm.value.galleryImages || [];
          this.productForm.patchValue({gallery: [...currentImages, file]});
          this.productForm.get('gallery')?.updateValueAndValidity();
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.productForm.get('gallery')?.setErrors({'maxImages': true});
    }
  }

  removeGalleryImage(index: number, galleryFileInput: HTMLInputElement) {
    this.galleryImagesPreview.splice(index, 1);
    const updateImages = this.productForm.value.galleryImages;
    this.productForm.patchValue({galleryImages: updateImages});
    this.productForm.get('gallery')?.updateValueAndValidity();
    if (this.galleryImagesPreview.length === 0) {
      galleryFileInput.value = '';
    }
  }

  loadProduct(productId: number) {
    this.store.select(selectProductById(productId)).subscribe(product => {
      if (product) {
        this.productForm.patchValue(product);
        this.productImagePreview = product.image as string;

        this.galleryImagesPreview = product.gallery.map(image => image.url as string);
      }
    });
  }

  getFormControl(name: string) {
    return this.productForm.get(name);
  }

  onCategorySelected($event: number) {
     this.productForm.patchValue({category: $event});
  }
}
