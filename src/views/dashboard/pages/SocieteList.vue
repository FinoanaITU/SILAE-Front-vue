<template>
  <v-container
    id="liste-salarie"
    fluid
    tag="section"
  >
    <base-material-card
      v-if="!hideAll"
      icon="mdi-clipboard-text"
      title="Liste des sociétés"
      class="px-5 py-3"
    >
      <v-card-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche"
          single-line
          hide-details
          clearable
          class="col-lg-4"
        />
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="societes"
        :search="search"
        :single-select="true"
        show-select
        item-key="siret"
        class="elevation-1"
      />
      <v-divider />

      <v-card-actions v-if="selected.length == 1">
        <v-btn
          text
          color="teal accent-4"
          @click="updateScopeSociete"
        >
          Choisir société
        </v-btn>
      </v-card-actions>
    </base-material-card>
  </v-container>
</template>

<script>
  import { getAPI } from '../../../axios-api'
  export default {
    name: 'MySocietes',
    data: () => ({
      headers: [
        { text: 'Nom societe', value: 'nomSociete' },
        { text: 'siret', value: 'siret' },
        { text: 'locale', value: 'locale' },
        { text: 'activiter', value: 'activiter' },
      ],
      societes: [],
      search: '',
      hideAll: true,
      selected: [],
    }),
    created () {
      this.getAllSocietes()
    },
    methods: {
      getAllSocietes () {
        this.loadingCube(true)
        getAPI.post(
          'gestion-societ/all-Societe',
        ).then((response) => {
          this.loadingCube(false)
          this.hideAll = false
          this.societes = JSON.parse(response.data)
        }).catch((error) => {
          this.loadingCube(false)
          this.showNotification(error, 'error')
        })
      },
      updateScopeSociete () {
        this.$store.commit('SET_SOCIETE', this.selected)
        this.$router.push('/list_salarie_management')
      },
    },
  }
</script>

<style>

</style>
