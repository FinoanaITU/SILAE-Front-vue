<template>
  <base-material-snackbar
    v-model="show"
    :type="color"
    bottom
    right
    transition="slide-x-reverse-transition"
  >
    <h4>{{ text }}</h4>
  </base-material-snackbar>
</template>

<script>
  export default {
    name: 'Interaction',
    data: () => ({
      timeout: 2000,
    }),

    computed: {
      text: {
        get () {
          return this.$store.state.textNotification
        },
      },
      color: {
        get () {
          return this.$store.state.colorNotification
        },
      },
      show: {
        get () {
          return this.$store.state.showNotification
        },
        set () {
          setTimeout(() => {
            return false
          }, this.timeout)
        },
      },
    },
  }
</script>
