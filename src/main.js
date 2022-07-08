import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSwal from 'vue-swal'

Vue.config.productionTip = false
import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);
Vue.use(VueSwal),

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
