import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/views/MainView.vue';
import Signin from '@/views/SignInView.vue';
import Signup from '@/views/SignUpView.vue';
import BoardList from '@/views/BoardListView.vue';
import MyPosts from '@/views/MyPosts.vue';
import MyInfo from '@/views/MyInfo.vue';
import Profile from '@/views/Profile.vue';
import EditMyInfo from '@/views/EditMyInfo.vue';
import EditPassword from '@/views/EditPassword.vue';
import BoardDetail from '@/views/BoardDetail.vue';
import RegistBoard from '@/views/RegistBoard.vue';
import EditBoard from '@/views/EditBoard.vue';
import DeleteBoard from '@/views/DeleteBoard.vue';
import UpdateBoard from '@/views/UpdateBoard.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin,
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup,
        },
        {
            path: '/board-list',
            name: 'BoardList',
            component: BoardList,
        },
        {
            path: '/regist',
            name: 'RegistBoard',
            component: RegistBoard,
        },
        {
            path: '/delete/:id',
            name: 'DeleteBoard',
            component: DeleteBoard,
            props: true,
        },
        {
            path: '/edit/:id',
            name: 'EditBoard',
            component: EditBoard,
            props: true,
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            children: [
                {
                    path: '/my-posts',
                    name: 'MyPosts',
                    component: MyPosts,
                },
                {
                    path: '/my-info',
                    name: 'MyInfo',
                    component: MyInfo,
                },
                {
                    path: '/edit-my-info',
                    name: 'EditMyInfo',
                    component: EditMyInfo,
                },
                {
                    path: '/change-password',
                    name: 'EditPassword',
                    component: EditPassword,
                },
            ],
        },
        {
            path: '/board/:id',
            name: 'BoardDetail',
            component: BoardDetail,
            props: true,
        },
    ],
});

export default router;
