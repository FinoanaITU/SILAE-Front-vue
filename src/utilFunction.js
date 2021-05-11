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
    },
})

export default { allMix }
