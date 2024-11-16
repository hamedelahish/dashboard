
import { createReducer, on } from '@ngrx/store';
import { addCategory, updateCategory, deleteCategory } from './category.actions';
import { ICategory } from '../../shared/models/category.model';

export interface CategoryState {
  categories: ICategory[];
}

const initialState: CategoryState = {
  categories: []
};

export const categoryReducer = createReducer(
  initialState,
  on(addCategory, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category]
  })),
  on(updateCategory, (state, { category }) => ({
    ...state,
    categories: state.categories.map(c => c.id === category.id ? category : c)
  })),
  on(deleteCategory, (state, { categoryId }) => ({
    ...state,
    categories: state.categories.filter(c => c.id !== categoryId)
  }))
);
