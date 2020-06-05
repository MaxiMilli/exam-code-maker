import Vue from 'vue'
import App from './App.vue'
import VueCodeHighlight from 'vue-code-highlight';

Vue.use(VueCodeHighlight) //registers the v-highlight directive
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
