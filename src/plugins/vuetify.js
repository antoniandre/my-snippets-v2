import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  customProperties: true,
  iconfont: 'md',
  theme: {
    primary: '#42b983',
    secondary: '#61d59d',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
