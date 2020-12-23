import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Acceuil',
      path: '',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // login
        {
          name: 'login',
          path: '/login',
          component: () => import('@/views/dashboard/Login'),
        },
        // page principale
        {
          name: 'Liste salarie',
          path: '/list_salarie',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Bulletin type',
          path: '/bulletin',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Ajout Employer',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
      ],
    },
  ],
})
