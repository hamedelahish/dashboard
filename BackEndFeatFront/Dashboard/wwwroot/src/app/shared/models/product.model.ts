import {IGalleryImage} from './gallery-image.model';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string | File;
  gallery: IGalleryImage[];
  stock: number;
}


export interface IProductFilterParameters {
  pageNumber: number;
  pageSize: number;
  name?: string;
  categoryId?: number;
  priceFrom?: number;
  priceTo?: number;
  stock?: number;
}
export interface IProductResponseItem {
  productId: number;
  name: string;
  description: string;
  price: number;
  categoryName: number;
  categoryId: number;
  galleries: IGalleryImage[];
  stock: number;
  createDate: string;
  updateDate: string;
}
