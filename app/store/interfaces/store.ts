import { IProduct } from 'app/interfaces/product';
import { IStaticPage } from 'app/interfaces/staticPage';
import { Commit, Store } from 'vuex';

import { ICategory } from '../../interfaces/category';

interface IAppStoreDispatch {
  //core
  (type: 'core/load'): Promise<any>;
  (type: 'core/loadCategories'): Promise<any>;
  (type: 'core/loadStaticPages'): Promise<any>;
  //cart
  (type: 'cart/addProduct', data: { product: IProduct; quantity: number }): Promise<any>;
  (type: 'cart/updateProduct', data: { product: IProduct; quantity: number }): Promise<any>;
  (type: 'cart/removeProduct', id: number): Promise<any>;
  (type: 'cart/clean'): Promise<any>;
}

interface IAppStoreCommit extends Commit {}

export interface IAppStore extends Store<any> {
  dispatch: IAppStoreDispatch;
  commit: IAppStoreCommit;

  getters: {
    //core
    ['core/categories']: ICategory[];
    ['core/mainCategories']: ICategory[];
    ['core/staticTopPages']: IStaticPage[];
    ['core/staticBottomPages']: IStaticPage[];
    //cart
    ['cart/products']: IProduct[];
    ['cart/total']: number;
  };
}
