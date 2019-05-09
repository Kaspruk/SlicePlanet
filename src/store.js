import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: null,
    manufactures: null,
  },
  getters: {
    CATEGORIES: state => state.categories,
    MANUFACTURES: state => state.categories,
  },
  mutations: {
    SET_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    SET_MANUFACTURES: (state, payload) => {
      state.manufactures = payload;
    },
  },
  actions: {

  }
})
