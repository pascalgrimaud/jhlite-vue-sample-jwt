import { createApp } from 'vue';
import App from './common/primary/app/App.vue';
import router from './router/router';
import {createPinia} from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// jhipster-needle-main-ts-import

// jhipster-needle-main-ts-instanciation

const app = createApp(App);
app.use(router);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
// jhipster-needle-main-ts-provider
app.mount('#app');
