// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from '../../mainframe/homepage/homepage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Homepage },
    { path: '/test', component: () => import('../views/test3.vue') },
    
    { path: '/article', component: () => import('../../mainframe/article/article-list.vue') },
    // 修改这里：增加 :id 参数，这样 article 页面就可以通过 route.params.id 知道要读哪个文件
    { 
      path: '/article/:id', 
      component: () => import('../../mainframe/article/article.vue'),
      props: true // 允许将 id 作为组件的 prop 传入
    },
    
    { path: '/about', component: () => import('../../mainframe/about/about.vue')}
  ]
})

export default router