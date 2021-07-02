import Vue from 'vue'

var allMix = Vue.mixin({
    methods: {
        dupliquerForm (tabName, obJectFromInitiale) {
            var accesTab = tabName.split('.')
            console.log(obJectFromInitiale)
            this[accesTab[0]].compteur++
            var newFormObject = Object.assign({}, this[obJectFromInitiale])
            this[accesTab[0]][accesTab[1]].push(newFormObject)
        },
        suprimerDupliqueForm (tabName) {
            var accesTab = tabName.split('.')
            console.log(accesTab)
            if (this[accesTab[0]].compteur > 1) {
              var index = this[accesTab[0]].compteur - 1
              this[accesTab[0]][accesTab[1]].splice(index, 1)
              this[accesTab[0]].compteur--
            }
          },
        numberOnly (val) {
          var result = true
          if (val !== null && val.length > 0) {
            if (isNaN(val)) {
              result = 'nombre uniquement'
            }
          } else {
            result = 'champs obligatoire'
          }
          return result
        },
        checkNumber (val) {
          if (isNaN(val) && val.length > 0) {
            return 'Numero de télephone incorrecte'
          } else {
            return true
          }
        },
        checkValiditerEmail (email) {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          var emailTest = pattern.test(email)
          var result = true
          if (emailTest) {
            result = true
            this.formCoordonee.emailValid = 'email valid'
          } else {
            result = 'email invalide'
          }
          return result
        },
        showNotification (text, color) {
          var show = true
          this.$store.commit('SET_NOTIFICATION', { color, text, show })
          setTimeout(() => {
            show = false
            this.$store.commit('SET_NOTIFICATION', { color, text, show })
          }, 2000)
        },

        loadingCube (value) {
          this.$store.commit('UPDATE_LOADING', value)
        },

        formatDate (date) {
          if (!date) return null
          const [year, month, day] = date.split('-')
          return `${month}/${day}/${year}`
        },
    },
})

export default { allMix }
