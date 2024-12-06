import { IOrderResponseItem } from "./order.model";
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
export interface IOrdersResponse {
  items: IOrderResponseItem[];
  pageNumber: number;
  pageSize: number;
  total: number;
}

export interface ICategoriesResponse {
  id: number;
  name: string;
  parentId: number;
  categoryOrder:number;
  children: ICategoriesResponse[];
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


export interface ISearchOrderParams {
  startDate?: string;
  endDate?: string;
  statusName?: string;
  customerName?: string;
  pageNumber: string;
  pageSize: string;
}
