import lodash from 'lodash';
import { MutationTree } from 'vuex/types';

import { IAppStoreStateCart } from '../interfaces/state';

// tslint:disable:typedef
export const mutations: MutationTree<IAppStoreStateCart> = {
  addProduct(state, { product, quantity }) {
    const productState = lodash.clone(product);
    productState.quantity = quantity;
    productState.totalPrice = productState.quantity * productState.price;

    state.products.push(productState);
  },
  updateProduct(state, { product, quantity }) {
    let productState = state.products.find(p => p.id === product.id);
    productState.quantity += quantity;
    productState.totalPrice = productState.quantity * productState.price;
  },
  removeProduct(state, productId) {
    const productIndex = state.products.findIndex(p => p.id === productId);
    state.products.splice(productIndex, 1);
  },
  clean(state) {
    state.products = [];
  }
};
