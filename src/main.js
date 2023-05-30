import { createApp } from 'vue';
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue';
import store from '../store/index'

const app = createApp(App).use(store);
app.mount('#app')
app.use(ElementPlus)