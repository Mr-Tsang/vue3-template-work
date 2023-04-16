import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/home.vue'),
  },
].concat([{
  path: '/:catchAll(.*)',
  name: 'not_found',
  component: () => import('../pages/404.vue')
}]);

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;
