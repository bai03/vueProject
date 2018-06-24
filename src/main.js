// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

import ScrollPage from "./components/common/ScrollPage.vue";
Vue.component("scrollpage",ScrollPage)

Vue.prototype.$center = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
