import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Catalog from './views/Catalog.vue'
import ProductPage from './views/ProductDetail.vue'
import CartPage from './views/CartPage.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/product/:objectId',
      name: 'product-page',
      component: ProductPage
    },
    {
      path: '/cart',
      name: 'cart-page',
      component: CartPage
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited. */
      /*component: () => import(/* webpackChunkName: "about" */ /* './views/About.vue') */
    /*} */
  ]
})
