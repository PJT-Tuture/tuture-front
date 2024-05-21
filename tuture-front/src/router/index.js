import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/MainView.vue"
import Signin from "@/views/SignInView.vue"
import Signup from "@/views/SignUpView.vue"
import BoardList from '@/views/BoardListView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/board-list',
      name: 'BoardList',
      component: BoardList
    }
  ]
})

export default router
