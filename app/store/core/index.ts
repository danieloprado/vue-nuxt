import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export default {
  namespaced: true,
  state: {
    categories: [],
    staticPages: []
  },
  getters,
  mutations,
  actions
};
