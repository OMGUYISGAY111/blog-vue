// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../../mainframe/homepage/homepage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Homepage },
    { path: '/test', component: () => import('../views/test.vue') },
    { path: '/article', component: () => import('../../progress.vue')}
    // ... 其他路由
  ]
})

export default router