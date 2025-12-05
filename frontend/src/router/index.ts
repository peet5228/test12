import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
  ],
})

export default router
