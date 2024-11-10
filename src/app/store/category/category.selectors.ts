import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CategoryState} from './category.reducer';
import {flattenCategories} from "../../shared/utils/flatten-categories";

export const selectCategoryState = createFeatureSelector<CategoryState>('category');

export const selectAllFlattenCategories = createSelector(selectCategoryState, (state: CategoryState) => flattenCategories(state.categories));

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories
);

export const selectCategoryById = (categoryId: number) => createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories.find(category => category.id === categoryId)
);
