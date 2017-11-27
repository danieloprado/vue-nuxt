import { ICategory } from '../../interfaces/category';
import { IProduct } from '../../interfaces/product';
import { IStaticPage } from '../../interfaces/staticPage';

export interface IAppStoreState {
  serverLoaded: boolean;
  core: IAppStoreStateCore;
  cart: IAppStoreStateCart;
}

export interface IAppStoreStateCore {
  categories: ICategory[];
  staticPages: IStaticPage[];
}

export interface IAppStoreStateCart {
  products: IProduct[];
}
