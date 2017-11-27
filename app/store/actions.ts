import { ActionTree } from 'vuex/types';

import { IAppStoreState } from './interfaces/state';

// tslint:disable:typedef
export const actions: ActionTree<IAppStoreState, any> = {
  async nuxtServerInit({ dispatch }): Promise<void> {
    await dispatch('core/load');
  },
  nuxtClientInit({ commit }): void {
    const state = JSON.parse(window.localStorage.vuex || '{}');
    state.serverLoaded = false;
    delete state.core;

    commit('loadLocalState', state);
  }
};
