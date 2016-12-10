import Vue from 'vue'
import App from './App'

require('script-loader!../config/didbot')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

