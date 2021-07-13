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
    colorNotification: null,
    textNotification: '',
    showNotification: false,
    loadingCube: false,
    societeEncours: {},
    modelBulletin: 'default',
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
    SET_NOTIFICATION (state, { color, text, show }) {
      state.colorNotification = color
      state.textNotification = text
      state.showNotification = show
    },
    UPDATE_LOADING (state, showloading) {
      state.loadingCube = showloading
    },
    SET_SOCIETE (state, societeInfo) {
      state.societeEncours = societeInfo
    },
    UPDATE_MODEL_BULLETIN (state, modelName) {
      state.modelBulletin = modelName
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
