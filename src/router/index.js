import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import PaymentView from '@/views/PaymentView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({
        title: route.query.title || '',
        page: parseInt(route.query.page) || 1,
        sort: route.query.sort || '',
        pricemin: Number(route.query.pricemin) || '',
        pricemax: Number(route.query.pricemax) || ''
      })
    },
    {
      path: '/offer/:id',
      name: 'offer',
      props: true,
      component: () => import('../views/OfferView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/publish',
      name: 'publish',
      meta: { requireAuth: true },
      component: () => import('../views/PublishView.vue')
    },
    {
      path: '/payment:id',
      name: 'payment',
      props:true,
      meta: { requireAuth: true },
      component: PaymentView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {requireAuth: true}
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})


router.beforeEach((to, from) => {
  
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requireAuth && !GlobalStore.userInfos.value?.token) {
    return { name: 'login', query:{ redirect: to.name}}
  }
})

export default router