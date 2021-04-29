<template>
  <v-app
    :style="{
      backgroundImage: 'url('+img+')',
      backgroundSize: 'cover'
    }"
  >
    <!-- <div v-if=" $store.state.accessToken != null"> -->
    <div v-if=" ($session.exists() && $route.name !== 'login') || ($session.exists() && $route.name === 'Acceuil') ">
      <dashboard-core-app-bar />

      <dashboard-core-drawer />

      <dashboard-core-view />

      <dashboard-core-settings />
    </div>
    <div
      v-else
    >
      <login />
    </div>
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',
    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
      Login: () => import('./Login'),
    },

    data: () => ({
      expandOnHover: false,
      img: require('@/assets/laptop-dash.jpg'),
    }),
    beforeCreate: function () {
      // console.log('session')
      // console.log(this.$session.exists())
      // console.log(this.$session.get('jwt'))
      // console.log(this.$route.name)
      // si lien acceuil
      if (this.$session.exists() && this.$route.name === 'Acceuil') {
        this.$router.push('/list_salarie')
      } else if (!this.$session.exists() && this.$route.name === 'Acceuil') {
        this.$router.push('/login')
      }
      // controlle tout les routes
      if (!this.$session.exists() && (this.$route.name !== 'login')) {
        // console.log('averiny login')
        this.$router.push('/login')
      } else {
        this.$router.push('/list_salarie')
        this.img = null
      }
    },
  }
</script>
