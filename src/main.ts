import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import 'bootstrap/dist/css/bootstrap.css'

createApp(App).use(store, key).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
