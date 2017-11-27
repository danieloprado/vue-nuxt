import { MutationTree } from 'vuex';

import { IAppStoreState } from './interfaces/state';

export const mutations: MutationTree<IAppStoreState> = {
  loadLocalState(state: IAppStoreState, localState: Partial<IAppStoreState>): void {
    Object.assign(state, localState);
  }
};
