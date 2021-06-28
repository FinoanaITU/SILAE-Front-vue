<template>
  <div class="text-center">
    <v-overlay :value="load">
      <breeding-rhombus-spinner
        :animation-duration="1300"
        :size="70"
        color="#FFFFFF"
      />
    </v-overlay>
  </div>
</template>

<script>
  import { BreedingRhombusSpinner } from 'epic-spinners'
  export default {
    name: 'Loader',
    components: {
      BreedingRhombusSpinner,
    },
    computed: {
      load: {
        get () {
          return this.$store.state.loadingCube
        },
      },
    },
  }
</script>

<style>

</style>
