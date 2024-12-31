export const AuthRoute = {
  path: '/auth',
  component: () => import('@/layout/BlankLayout.vue'),
  meta: {
    requiresAuth: false,
  },
  children: [
    {
      name: 'SignIn',
      path: '/auth/sign-in',
      component: () => import('@/view/auth/sign-in/SignInView.vue'),
    },
    {
      name: 'SignUp',
      path: '/auth/sign-up',
      component: () => import('@/view/sample/RegisterView.vue'),
    },
  ],
}
