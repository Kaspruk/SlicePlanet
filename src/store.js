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
            if (payload) {
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
            if (storageCart) {
                context.commit('SET_USER_CART', JSON.parse(storageCart));
            }
        },
        GET_USER_CART_ITEM_COUNT: async (context) => {
            let count = 0;
            _.forEach(context.getters.USER_CART, c => count += c.count);
            context.commit('SET_USER_CART_ITEM_COUNT', count);
        },
        ADD_PRODUCT_TO_CART: async (context, product) => {
            let products = [];
            const someProduct =  _.clone(product);
            if (context.getters.USER_CART) {
                products =  context.getters.USER_CART;
                /*if (products[product.objectId]) {
                    someProduct.count = (+product.count + +products[product.objectId].count)
                }*/
            }
            const index = _.findIndex(products, { objectId: someProduct.objectId });
            if (index !== -1) {
                someProduct.count = +product.count + +products[index].count;
                products[index] = someProduct;
            } else {
                products.push(someProduct);
            }
            //Vue.set(products, product.objectId, Object.assign({}, someProduct));
            context.commit('SET_USER_CART', products);
        },
        CHANGE_PRODUCT_COUNT: async (context, product) => {
            const someProduct = _.clone(product);
            const products = context.getters.USER_CART;
            const index = _.findIndex(products, { objectId: someProduct.objectId });
            products[index] = someProduct;
            context.commit('SET_USER_CART', products);
        },
        UPDATE_LOCAL_STORAGE_CART: async (context) => {
            localStorage.setItem('localCart', JSON.stringify(context.getters.USER_CART));
        }
    }
});
