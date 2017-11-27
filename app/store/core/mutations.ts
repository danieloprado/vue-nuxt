import { MutationTree } from 'vuex';

import { ICategory } from '../../interfaces/category';
import { IStaticPage } from '../../interfaces/staticPage';
import { IAppStoreStateCore } from '../interfaces/state';

export const mutations: MutationTree<IAppStoreStateCore> = {
  setCategories(state: IAppStoreStateCore, categories: ICategory[]): void {
    state.categories = categories;
  },
  setStaticPages(state: IAppStoreStateCore, staticPages: IStaticPage[]): void {
    state.staticPages = staticPages;
  }
};
