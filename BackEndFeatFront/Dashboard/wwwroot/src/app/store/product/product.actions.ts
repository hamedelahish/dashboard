
import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../shared/models/product.model';

export const addProduct = createAction('[Product] Add Product', props<{ product: IProduct }>());
export const updateProduct = createAction('[Product] Update Product', props<{ product: IProduct }>());
export const deleteProduct = createAction('[Product] Delete Product', props<{ productId: number }>());
