import { ActionTree } from 'vuex/types';

import { list as categoryList } from '../../services/category';
import { IAppStoreStateCore } from '../interfaces/state';

// tslint:disable:typedef
export const actions: ActionTree<IAppStoreStateCore, any> = {
  async load({ dispatch }) {
    return await Promise.all([dispatch('loadCategories'), dispatch('loadStaticPages')]);
  },
  async loadCategories({ commit }) {
    const categories = await categoryList();
    commit('setCategories', categories);

    return categories;
  },
  loadStaticPages({ commit }) {
    commit('setStaticPages', [
      { title: 'Novidades', position: 'top' },
      { title: 'Receitas', position: 'top' },
      { title: 'Sobre Nós', position: 'bottom' },
      { title: 'Como Funciona', position: 'bottom' },
      { title: 'Privacidade', position: 'bottom' },
      { title: 'Dicas', position: 'bottom' },
      { title: 'Fale Conosco', position: 'bottom' }
    ]);
  }
};
