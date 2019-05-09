import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    categories: null,
    manufactures: null,
  },
  getters: {
    USER: state => state.user,
    CATEGORIES: state => state.categories,
    MANUFACTURES: state => state.categories,
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
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
