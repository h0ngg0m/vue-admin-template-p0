import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '@/store/adminStore.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/component/layout/default/DefaultLayout.vue'),
      children: [
        {
          name: 'Home',
          path: '/',
          component: () => import('@/view/HomeView.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: () => import('@/component/layout/BlankLayout.vue'),
      children: [
        {
          name: 'SignIn',
          path: '/auth/sign-in',
          component: () => import('@/view/auth/SignInView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/component/layout/default/DefaultLayout.vue'),
      children: [
        {
          name: 'Admin',
          path: '/management/admin',
          component: () => import('@/view/management/admin/AdminView.vue'),
        },
      ],
    },
    {
      path: '/notice',
      component: () => import('@/component/layout/default/DefaultLayout.vue'),
      children: [
        {
          name: 'Notice',
          path: '/management/notice',
          component: () => import('@/view/management/notice/NoticeView.vue'),
        },
        {
          name: 'Notice Add',
          path: '/management/notice/add',
          component: () => import('@/view/management/notice/AddNotice.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/view/error/Error404View.vue'),
    },
  ],
})

const PUBLIC_ROUTES = ['SignIn']

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isTokenExpired } = useAdminStore()
  if (PUBLIC_ROUTES.includes(to.name as string) || (isAuthenticated && !isTokenExpired())) {
    next()
  } else {
    next({ name: 'SignIn' })
  }
})

export default router
