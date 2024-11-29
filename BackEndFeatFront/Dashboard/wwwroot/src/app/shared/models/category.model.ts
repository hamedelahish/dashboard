export interface ICategory {
  parentId:number,
  categoryOrder: number,
  id: number;
  name: string;
  description?: string;
  children?: ICategory[];
}

export interface ICategorySelection {
  title: string;
  description?: string;
  id: number;

}
