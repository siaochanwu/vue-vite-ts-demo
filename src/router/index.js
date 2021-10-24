import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/todo'
        },
        {
            path: '/todo',
            component: () => import('../views/Todo.vue')
        }
        
    ]
})

export default router