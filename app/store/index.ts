import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { actions } from './actions';
import cart from './cart';
import core from './core';
import { getters } from './getters';
import { IAppStoreState } from './interfaces/state';
import { mutations } from './mutations';

export default () => {
  const plugins = [];
  let state: Partial<IAppStoreState> = {};

  if (process.browser) {
    plugins.push(createPersistedState());
  } else {
    state.serverLoaded = true;
  }

  return new Vuex.Store({
    plugins,
    state,
    getters,
    mutations,
    actions,
    modules: { core, cart } as any
  });
};
