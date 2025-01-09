import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(vuetify)
app.use(Vue3Toastify, {
  position: 'top-left',
} as ToastContainerOptions)
app.use(LoadingPlugin)

app.mount('#app')
