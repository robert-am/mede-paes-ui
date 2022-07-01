import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
Vue.config.productionTip = false
import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
