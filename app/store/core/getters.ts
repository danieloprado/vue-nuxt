import { GetterTree } from 'vuex/types';

import { ICategory } from '../../interfaces/category';
import { IStaticPage } from '../../interfaces/staticPage';
import { IAppStoreStateCore } from '../interfaces/state';

export const getters: GetterTree<IAppStoreStateCore, any> = {
  categories(state: IAppStoreStateCore): ICategory[] {
    return state.categories;
  },
  mainCategories(state: IAppStoreStateCore): ICategory[] {
    return state.categories.filter(c => !c.parentId);
  },
  staticTopPages(state: IAppStoreStateCore): IStaticPage[] {
    return state.staticPages.filter(p => p.position === 'top');
  },
  staticBottomPages(state: IAppStoreStateCore): IStaticPage[] {
    return state.staticPages.filter(p => p.position === 'bottom');
  }
};
