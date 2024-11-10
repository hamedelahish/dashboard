import {createReducer, on} from '@ngrx/store';
import {addProduct, updateProduct, deleteProduct} from './product.actions';
import {IProduct} from '../../shared/models/product.model';

export interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: []
};

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, {product}) => {
    const lastId = state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) : 0;
    const newProduct: IProduct = {...product, id: lastId + 1};
    return {
      ...state, products: [newProduct, ...state.products]
    };
  }),
  on(updateProduct, (state, {product}) => ({
    ...state,
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  on(deleteProduct, (state, {productId}) => ({
    ...state,
    products: state.products.filter(p => p.id !== productId)
  }))
);
