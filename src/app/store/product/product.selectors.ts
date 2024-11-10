import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProductState} from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectFilteredProducts = (searchParams: any) => createSelector(selectProductState, (state: ProductState) => {
  return state.products.filter(product => {
    const matchesSearchText = !searchParams.searchText || product.name.includes(searchParams.searchText);
    const matchesCategoryId = !searchParams.categoryId || product.categoryId === searchParams.categoryId;
    const matchesPriceFrom = !searchParams.priceFrom || product.price >= searchParams.priceFrom;
    const matchesPriceTo = !searchParams.priceTo || product.price <= searchParams.priceTo;
    const matchesStock = searchParams.stock == null || product.stock === searchParams.stock;
    return matchesSearchText && matchesCategoryId && matchesPriceFrom && matchesPriceTo && matchesStock;
  });
});


export const selectProductById = (productId: number) => createSelector(
  selectProductState,
  (state: ProductState) => state.products.find(product => product.id === productId)
);
