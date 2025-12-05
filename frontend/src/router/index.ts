import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import LogiinForm from '@/LoginForm.vue'
import LogiinForm from '@/component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LogiinForm,
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LogiinForm,
    },
  ],
})

export default router
