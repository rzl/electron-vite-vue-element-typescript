import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import { setBeforeEach } from './beforeEach';
const routerHistory = createWebHistory();


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('@/views/login/login.vue')
        },
        // {
        //     path: '/test',
        //     component: () => import('@/components/layouts/default/default.vue'),
        //     children: [
        //         {
        //             path: '/test/table',
        //             component: () => import('@/views/table.vue'),
        //         },
        //         {
        //             path: '/test/form',
        //             component: () => import('@/views/form.vue'),
        //         }
        //     ]
        // },
        { path: '/:pathMatch(.*)*', name: '__404NotFound__', component: () => import('@/views/pages/404.vue') },

    ]
})

setBeforeEach(router)

export default router