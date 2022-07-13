import App from './App.vue'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSwal from 'vue-swal'
import VueSignaturePad from 'vue-signature-pad';

Vue.config.productionTip = false
Vue.use(VueSignaturePad);
Vue.use(VueSwal)
Vue.use(router)

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')