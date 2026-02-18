import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'bootstrap/dist/css/bootstrap.min.css' // bootstrap css import
import 'bootstrap-icons/font/bootstrap-icons.css' // bootstrap icon css import
//import 'bootstrap/dist/js/bootstrap.bundle.js'// bootstrap js import

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
