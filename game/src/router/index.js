import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import GamePage from '@/pages/GamePage.vue'

export const HomeRoute = '/'
export const GameRoute = '/games'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: HomeRoute,
      name: 'home',
      component: HomePage,
    },

    {
      path: GameRoute,
      name: 'game',
      component: GamePage
    },
  ],
})

export default router