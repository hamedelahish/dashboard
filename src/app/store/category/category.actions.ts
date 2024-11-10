
import { createAction, props } from '@ngrx/store';
import { ICategory } from '../../shared/models/category.model';

export const addCategory = createAction('[Category] Add Category', props<{ category: ICategory }>());
export const updateCategory = createAction('[Category] Update Category', props<{ category: ICategory }>());
export const deleteCategory = createAction('[Category] Delete Category', props<{ categoryId: number }>());
