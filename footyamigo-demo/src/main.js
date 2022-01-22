import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import CountryFlag from 'vue-country-flag'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './styles/app.css'


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('country-flag', CountryFlag)

new Vue({
    render: h => h(App),
}).$mount('#app')