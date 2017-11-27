import { IProduct } from './product';

export interface IProductQueryResult {
  total: number;
  data: IProduct[];
}
