import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Backendless from 'backendless';
import App from './App.vue'
import router from './router'
import store from './store'

const APP_ID = '18D69D2E-15FE-994E-FF52-306D336F9F00';
const API_KEY = '66F743BC-7A95-0572-FFBD-7EF5289AA100';
Backendless.initApp(APP_ID, API_KEY);
Object.defineProperty(Vue.prototype, 'API', { value: Backendless });
Object.defineProperty(Vue.prototype, 'dataQueryBuilderSort', { value: Backendless.DataQueryBuilder.create().setSortBy(['sort ASC']) });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
