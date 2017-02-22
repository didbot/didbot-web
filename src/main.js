import Vue from 'vue'
import Didbot from './Didbot'

require('script-loader!../config/didbot')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Didbot/>',
  components: { Didbot }
})

