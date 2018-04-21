import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    year: null,
    organization: null,
    budget: null,
    field: null,
  },
  getters: {
    getOrganization: (state) => {
      return state.organization;
    },
    getYear: (state) => {
      return state.year;
    },
    getBudget: (state) => {
      return state.budget;
    },
    getField: (state) => {
      return state.field;
    },
  },
  mutations: {
    setOrganization: (state, payload) => {
      state.organization = payload;
    },
    setYear: (state, payload) => {
      state.year = payload;
    },
    setBudget: (state, payload) => {
      state.budget = payload;
    },
    setField: (state, payload) => {
      state.field = payload;
    },
  },
  actions: {
    actionSetOrganization: ({
      commit
    }, payload) => {
      commit('setOrganization', payload);
    },
    actionSetYear: ({
      commit
    }, payload) => {
      commit('setYear', payload);
    },
    actionSetBudget: ({
      commit
    }, payload) => {
      commit('setBudget', payload);
    },
    actionSetField: ({
      commit
    }, payload) => {
      commit('setField', payload);
    },
  },
  modules: {

  }
});
