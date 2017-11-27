import lodash from 'lodash';
import { GetterTree } from 'vuex';

import { IAppStoreStateCart } from '../interfaces/state';

// tslint:disable:typedef
export const getters: GetterTree<IAppStoreStateCart, any> = {
  products(state) {
    return lodash.cloneDeep(state.products);
  },
  total(state) {
    return state.products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  }
};
