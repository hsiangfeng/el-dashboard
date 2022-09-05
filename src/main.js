import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import { date, currency } from './service/filters';

const app = createApp(App);

// filters 技巧
app.config.globalProperties.$filters = {
  date,
  currency,
};

app.use(VueAxios, axios);
app.use(ElementPlus);
app.use(router);
app.mount('#app');
