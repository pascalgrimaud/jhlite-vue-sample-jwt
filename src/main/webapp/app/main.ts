import { createApp } from 'vue';
import App from './common/primary/app/App.vue';
import router from './router/router';
import {createPinia} from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
import AuthenticationRepository from './common/secondary/AuthenticationRepository';
import { AxiosHttp } from './http/AxiosHttp';
import axios from 'axios';
import ConsoleLogger from './common/secondary/ConsoleLogger';
import Homepage from './common/primary/homepage/Homepage.vue';
// jhipster-needle-main-ts-import

const axiosHttp = new AxiosHttp(axios.create({ baseURL: '' }));
const consoleLogger = new ConsoleLogger(console);
// jhipster-needle-main-ts-instanciation

const app = createApp(Homepage);
app.use(router);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
const authenticationRepository = new AuthenticationRepository(axiosHttp, pinia);
app.provide('authenticationService', authenticationRepository);
app.provide('logger', consoleLogger);
app.provide('router', router);
// jhipster-needle-main-ts-provider
app.mount('#app');
