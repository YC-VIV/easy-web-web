import { createApp } from 'vue';
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue';

const app = createApp(App);
app.mount('#app')
app.use(ElementPlus)