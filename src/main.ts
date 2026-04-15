import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './components/router/index';
import mdPlugins from './plugins/markdown-plugin'

const app = createApp(App);
app.use(mdPlugins);
app.use(router);
app.mount('#app');
