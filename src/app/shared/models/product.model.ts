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


