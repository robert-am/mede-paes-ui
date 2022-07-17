import App from './App.vue'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSwal from 'vue-swal'
import VueSignaturePad from 'vue-signature-pad';
import VNumeric from "vuetify-numeric/vuetify-numeric.umd";

Vue.config.productionTip = false
Vue.use(VueSignaturePad);
Vue.use(VueSwal)
Vue.use(router)
Vue.use(VNumeric);

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')