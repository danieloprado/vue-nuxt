import { ICategory } from 'app/interfaces/category';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  available?: number;
  description: string;
  long_description?: string;
  images?: {
    url: string;
  }[];

  thumbnail?: string;
  link?: { name: string; params?: any };

  quantity?: number;
  totalPrice?: number;

  category?: ICategory;
}
