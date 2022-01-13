import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/sign_up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../views/Room.vue')
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: () => import('../views/Lobby.vue')
  },
  {
    path: '/myPage',
    name: 'MyPage',
    component: () => import('../views/MyPage.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
