import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueSession from 'vue-session'
import allMix from './utilFunction'

Vue.config.productionTip = false
// Vue.prototype.$utils = utils

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App),
}).$mount('#app')

var options = {
    persist: true,
}

Vue.use(VueSession, options)
Vue.use(allMix)
