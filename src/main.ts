import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import vuetify from '@/plugin/vuetify'
import '@/scss/style.scss'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import VueApexCharts from 'vue3-apexcharts'
import VueTablerIcons from 'vue-tabler-icons'
import Maska from 'maska'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router)
app.use(pinia)

app.use(vuetify)
app.use(PerfectScrollbar)
app.use(VueTablerIcons)
app.use(Maska)
app.use(VueApexCharts)
app.use(Vue3Toastify, {
  position: 'top-left',
} as ToastContainerOptions)
app.use(LoadingPlugin)

app.mount('#app')
