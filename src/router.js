import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
          name: 'Liste salarie principale',
          path: '/list_salarie',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
          name: 'Liste salarie',
          path: '/list_salarie_management',
          component: () => import('@/views/dashboard/tables/SalarieList'),
        },
        {
          name: 'Bulletin type',
          path: '/bulletin',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Liste societe ',
          path: '/list_societe',
          component: () => import('@/views/dashboard/pages/SocieteList'),
        },
        // Pages
        {
          name: 'Ajout Employer',
          path: 'pages/user/:idSalarie',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Bordereaux',
          path: 'pages/bordereaux',
          component: () => import('@/views/dashboard/pages/Bordereaux'),
        },
        {
          name: 'Parametrage model',
          path: 'pages/parametrage_model',
          component: () => import('@/views/dashboard/pages/ModelOption'),
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
