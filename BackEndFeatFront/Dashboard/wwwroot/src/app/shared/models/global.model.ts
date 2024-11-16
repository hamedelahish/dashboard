import { IProduct, IProductResponseItem } from "./product.model";

export interface NzTreeNode {
  title: string;
  key: string;
  children?: NzTreeNode[];
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface IProductResponse {
  items: IProductResponseItem[];
  pageNumber: number;
  pageSize: number;
  total: number;
}


export interface ICategoriesResponse {
  id: number
  name: string
  parentId: any
  children: ICategoriesResponse[]
}


export interface ISearchParams {
  searchText?: string;
  categoryId?: string;
  priceFrom?: string;
  priceTo?: string;
  stock?: string;
  pageNumber: string;
  pageSize: string;
}
