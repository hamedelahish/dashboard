export interface IGalleryImage {
  id: number;
  url: string | File;
  galleryUrl?:string;
  isMain?:boolean
}
export interface IGalleryResponseItem {
  galleryId:number;
  galleryUrl:string;
  galleryIsDeleted:boolean;
  isMain:boolean;

}

export interface IGalleryUpdateDto {
  productId:number;
  galleryId:number;
  galleryUrl:string;
  galleryFile?:File;
  isDeleted:boolean;
  isMain:boolean;

}


