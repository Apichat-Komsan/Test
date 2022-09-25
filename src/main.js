import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
const moment = require('moment')
Vue.use(VueMoment, {
  moment
})
// API request
Vue.axios.interceptors.request.use(function (config) {
  config.headers.common.Authorization = Vue.$cookies.isKey('jwt_token')
    ? `Bearer ${Vue.$cookies.get('jwt_token')}`
    : 'null'
  return config
})

Vue.prototype.$formatDate = 'DD MMM'
Vue.prototype.$formatDateTime = 'DD MMM YYYY (HH:mm)'
Vue.prototype.$formatTime = 'HH:mm'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
