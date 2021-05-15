import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@/sass/overrides.sass'
import korean from 'vuetify/es5/locale/ko'

Vue.use(Vuetify)

const theme = {
  primary: '#E91E63',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
}

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
  lang: {
    current: korean,
  },
})
