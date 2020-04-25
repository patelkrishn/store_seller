import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueGoogleCharts from 'vue-google-charts'
 
Vue.use(VueGoogleCharts)

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
      iconfont: 'md', // default - only for display purposes
    },
  })
