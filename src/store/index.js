import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth/'
import alert from './modules/alert/'
import products from './modules/products/'
import inventories from './modules/inventories/'
import invoices from './modules/invoices/'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
      auth,
      alert,
      products,
      inventories,
      invoices
  },
});

