import { createRouter, createWebHistory } from 'vue-router'
import Main from "@/views/MainView.vue"
import Signin from "@/views/SignInView.vue"
import Signup from "@/views/SignUpView.vue"
import BoardList from '@/views/BoardListView.vue'
import MyPosts from '@/views/MyPosts.vue';
import MyRequests from '@/views/MyRequests.vue';
import MyInfo from '@/views/MyInfo.vue';

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
    },
    {
      path: '/my-posts',
      name: 'MyPosts',
      component: MyPosts
    },
    {
      path: '/my-requests',
      name: 'MyRequests',
      component: MyRequests
    },
    {
      path: '/my-info',
      name: 'MyInfo',
      component: MyInfo
    }
  ]
})

export default router