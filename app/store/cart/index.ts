import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters,
  mutations,
  actions
};
