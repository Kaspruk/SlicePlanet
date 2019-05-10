import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    user_cart: null,
    user_cart_item_count: null,
    categories: null,
    manufactures: null,
  },
  getters: {
    USER: state => state.user,
    USER_CART: state => state.user_cart,
    USER_CART_ITEM_COUNT: state => state.user_cart_item_count,
    CATEGORIES: state => state.categories,
    MANUFACTURES: state => state.categories,
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_USER_CART: (state, payload) => {
      state.user_cart = payload;
      if(payload) {
        store.dispatch('UPDATE_LOCAL_STORAGE_CART');
        store.dispatch('GET_USER_CART_ITEM_COUNT');
      }
    },
    SET_USER_CART_ITEM_COUNT: (state, payload) => {
      state.user_cart_item_count = payload;
    },
    SET_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    SET_MANUFACTURES: (state, payload) => {
      state.manufactures = payload;
    },
  },
  actions: {
    GET_USER_CART_FROM_LOCALSTORAGE: async (context) => {
      const storageCart = localStorage.getItem('localCart');
      if (storageCart && JSON.parse(storageCart).length) {
        context.commit('SET_USER_CART', JSON.parse(storageCart));
      }
    },
    GET_USER_CART_ITEM_COUNT: async (context) => {
      let count = 0;
      _.forEach(_.map(context.getters.USER_CART, (c) => { return +c.count }), n => count += n);
      context.commit('SET_USER_CART_ITEM_COUNT', count);
    },
    ADD_PRODUCT_TO_CART: async (context, product) => {
      let products = [];
      if(context.getters.USER_CART){
        products = context.getters.USER_CART;
      }
      products.unshift(product);
      products = _.uniqBy(products, 'objectId');
      context.commit('SET_USER_CART', products);
    },
    UPDATE_LOCAL_STORAGE_CART: async (context) => {
      localStorage.setItem('localCart', JSON.stringify(context.getters.USER_CART));
    }
  }
});
