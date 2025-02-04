// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from 'vue-router';
import AdminRootLayout from '@/layouts/AdminRootLayout.vue';
import Test from '@/views/Test.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/root',
    component: AdminRootLayout,
    children: [
      {
        path: 'test', // Esto se concatenará a /root/test
        name: 'Test',
        component: Test,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/root/test',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    console.log('Navegando desde:', from.fullPath, 'hacia:', to.fullPath);
    next();
  });

export default router;