import { createRouter, createWebHistory } from 'vue-router'
import RegisterForm from '@/RegisterForm.vue'
import LogiinForm from '@/LoginForm.vue'

import UserLayout from '@/components/UserLayout.vue'
import Evaluatee from '@/views/Evaluatee/index.vue'
import Edit_eva from '@/views/Evaluatee/Edit_eva.vue'
import Selfeva from '@/views/Evaluatee/Selfeva.vue'
import Check_score from '@/views/Evaluatee/Check_score.vue'

// staff
import index from '@/views/Staff/index.vue'
import ManageEva from '@/views/Staff/ManageEva.vue'
import ManageCommit from '@/views/Staff/ManageCommit.vue'
import Topic from '@/views/Staff/Topic.vue'
import Indicate from '@/views/Staff/Indicate.vue'
import Round_eva from '@/views/Staff/Round_eva.vue'
import Eva from '@/views/Staff/Eva.vue'
import Eva_commit from '@/views/Staff/Eva_commit.vue'


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
    //eva
    {
      path: '/Evaluatee',
      component: UserLayout,
      children: [
        {
          path: '/Evaluatee',
          name: 'Evaluatee',
          component: Evaluatee,
        },
        {
          path: '/Edit_eva',
          name: 'Edit_eva',
          component: Edit_eva,
        },
        {
          path: '/Selfeva',
          name: 'Selfeva',
          component: Selfeva,
        },
        {
          path: '/Check_score',
          name: 'Check_score',
          component: Check_score,
        },
      ]
    },
    // staff ========
    {
      path: '/Staff',
      component: UserLayout,
      children: [
        {
          path: '/Staff',
          name: 'StaffDashboatd',
          component: index,
        },
        {
          path: '/ManageEva',
          name: 'ManageEva',
          component: ManageEva,
        },
        {
          path: '/ManageCommit',
          name: 'ManageCommit',
          component: ManageCommit,
        },
        {
          path: '/Topic',
          name: 'Topic',
          component: Topic,
        },
        {
          path: '/Indicate',
          name: 'Indicate',
          component: Indicate,
        },
        {
          path: '/Round_eva',
          name: 'Round_eva',
          component: Round_eva,
        },
        {
          path: '/Eva',
          name: 'Eva',
          component: Eva,
        },
        {
          path: '/Eva_commit/:id_eva',
          name: 'Eva_commit',
          component: Eva_commit,
        },
      ]
    },
  ],
})

export default router
