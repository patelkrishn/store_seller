import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import {routes} from './routes'
import StoreData from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store(StoreData);

const router = new VueRouter({
  routes,
  mode:'history'
});

router.beforeEach((to,from,next) => {
  const requiresAuth=to.matched.some(record => record.meta.requiresAuth);
  const currentUser = store.state.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if(to.path=='/login' && currentUser) {
    next('/');
  }else {
    next();
  }
})

axios.interceptors.response.use(null,(error)=>{
  if (error.response.status ==401) {
    store.commit('loginFailed',error.response.data.message);
    store.commit('logout');
    router.push('/login');
  }
})


Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
