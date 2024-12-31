export const MainRoute = {
  path: '/main',
  meta: {
    requiresAuth: true,
  },
  redirect: '/main',
  component: () => import('@/layout/full/FullLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/',
      component: () => import('@/view/sample/DashboardView.vue'),
    },
    {
      name: 'Alert',
      path: '/ui/alerts',
      component: () => import('@/view/sample/AlertView.vue'),
    },
    {
      name: 'Buttons',
      path: '/ui/buttons',
      component: () => import('@/view/sample/ButtonView.vue'),
    },
    {
      name: 'Cards',
      path: '/ui/cards',
      component: () => import('@/view/sample/CardView.vue'),
    },
    {
      name: 'Tables',
      path: '/ui/tables',
      component: () => import('@/view/sample/TableView.vue'),
    },
    {
      name: 'Icons',
      path: '/icons',
      component: () => import('@/view/sample/IconView.vue'),
    },
  ],
}
