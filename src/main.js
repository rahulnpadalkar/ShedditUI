import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  duration: 3000,
  position: "bottom-right",
  theme: "bubble"
})
Vue.use(VModal)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
