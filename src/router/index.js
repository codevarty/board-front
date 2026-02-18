import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('../views/board/BoardListView.vue'),
    },
    {
      path: '/board/:boardId',
      name: 'BoardDetail',
      component: () => import('../views/board/BoardDetailView.vue'),
      meta: { layout: 'DefaultLayout' }
    }
  ],
})

export default router
