import { IAppStoreStateCart } from 'app/store/interfaces/state';
import { ActionTree } from 'vuex';

// tslint:disable:typedef

export const actions: ActionTree<IAppStoreStateCart, any> = {
  addProduct({ commit, state }, data) {
    const product = data.product;

    if (state.products.some(p => p.id === product.id)) {
      return commit('updateProduct', data);
    }

    return commit('addProduct', data);
  },
  updateProduct({ commit, state }, { product, quantity }) {
    const cartProduct = state.products.find(p => p.id === product.id);

    if (!cartProduct) {
      throw new Error('product-not-found');
    }

    return commit('updateProduct', {
      product,
      quantity: quantity - cartProduct.quantity
    });
  },
  removeProduct({ commit }, productId) {
    commit('removeProduct', productId);
  },
  clean({ commit }) {
    commit('clean');
  }
};
