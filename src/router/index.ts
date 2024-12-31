import { createRouter, createWebHistory } from 'vue-router'
import { MainRoute } from './MainRoute.ts'
import { AuthRoute } from './AuthRoute.ts'
import { useAdminStore } from '@/store/adminStore.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/view/error/Error404View.vue'),
    },
    MainRoute,
    AuthRoute,
  ],
})

const PUBLIC_ROUTES = ['SignIn', 'SignUp']

router.beforeEach((to, from, next) => {
  const { isAuthenticated, isTokenExpired, howManySecondsLeft } = useAdminStore()
  console.log('howManySecondsLeft', howManySecondsLeft()) // TODO: Remove this line
  if (PUBLIC_ROUTES.includes(to.name as string) || (isAuthenticated && !isTokenExpired())) {
    next()
  } else {
    next({ name: 'SignIn' })
  }
})

export default router
