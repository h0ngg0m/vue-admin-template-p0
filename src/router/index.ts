import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/default/DefaultLayout.vue'),
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
      component: () => import('@/layout/BlankLayout.vue'),
      children: [
        {
          name: 'SignIn',
          path: '/auth/sign-in',
          component: () => import('@/view/auth/SignInView.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: () => import('@/layout/default/DefaultLayout.vue'),
      children: [
        {
          name: 'User',
          path: '/user',
          component: () => import('@/view/user/UserView.vue'),
        },
      ],
    },
    {
      path: '/setting',
      component: () => import('@/layout/default/DefaultLayout.vue'),
      children: [
        {
          name: 'Setting',
          path: '/setting',
          component: () => import('@/view/setting/SettingView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/view/error/Error404View.vue'),
    },
  ],
})

// TODO: 인증 처리
// const PUBLIC_ROUTES = ['SignIn']
//
// router.beforeEach((to, from, next) => {
//   const { isAuthenticated, isTokenExpired } = useAdminStore()
//   if (PUBLIC_ROUTES.includes(to.name as string) || (isAuthenticated && !isTokenExpired())) {
//     next()
//   } else {
//     next({ name: 'SignIn' })
//   }
// })

export default router
