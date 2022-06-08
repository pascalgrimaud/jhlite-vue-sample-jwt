import { AppVue } from '@/common/primary/app';
import { createRouter, createWebHistory } from 'vue-router';
import { LoginVue } from '@/common/primary/login';
// jhipster-needle-router-imports


const routes = [
  {
    path: '/',
    redirect: { name: 'Homepage' },
  },
  {
    path: '/app',
    name: 'App',
    component: AppVue,
  },
    {
  path: '/login',
  name: 'Login',
  component: LoginVue,
  },
  {
  path: '/',
  name: 'Homepage',
  component: AppVue,
  },
// jhipster-needle-router-routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
