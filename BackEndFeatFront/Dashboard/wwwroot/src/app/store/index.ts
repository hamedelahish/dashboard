import { CategoryState } from './category/category.reducer';
import { ProductState } from './product/product.reducer';

export interface AppState {
  product: ProductState;
  category: CategoryState;
}
