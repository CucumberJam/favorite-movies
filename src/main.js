import {createPinia} from 'pinia'
import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'

const app = createApp(App);
app.use(createPinia());
app.mount('#app')
