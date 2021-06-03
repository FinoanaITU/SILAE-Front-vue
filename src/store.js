import Vue from 'vue'
import Vuex from 'vuex'
import { getAPI } from './axios-api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg',
    drawer: null,
    accessToken: null,
    refreshToken: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    updateStorage (state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
  },
  actions: {
    userLogin (context, usercredentials) {
      return new Promise((resolve) => {
          getAPI.post('/api-token/', {
              email: usercredentials.username,
              password: usercredentials.password,
          })
          .then(response => {
              context.commit('updateStorage', {
                  access: response.data.access,
                  refresh: response.data.refresh,
                })
                resolve()
          })
      })
    },
  },
})
