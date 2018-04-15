import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    organizationId: null,
  },
  getters: {
    getOrganizationId: (state) => {
      return state.organizationId;
    },
  },
  mutations: {
    setOrganizationId: (state, payload) => {
      state.organizationId = payload;
    },
  },
  actions: {
    actionSetOrganizationId: ({
      commit
    }, payload) => {
      commit('setOrganizationId', payload);
    },
  },
  modules: {

  }
});
