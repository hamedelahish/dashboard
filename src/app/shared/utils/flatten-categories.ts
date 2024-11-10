import { ICategory } from '../models/category.model';

export const flattenCategories = (categories: ICategory[]): ICategory[] => {
  const flatCategories: ICategory[] = [];

  const flatten = (categories: ICategory[], parentName = '') => {
    for (const category of categories) {
      const categoryName = parentName ? `${parentName} > ${category.name}` : category.name;
      flatCategories.push({ ...category, name: categoryName });
      if (category.children && category.children.length) {
        flatten(category.children, categoryName);
      }
    }
  };

  flatten(categories);
  return flatCategories;
};
