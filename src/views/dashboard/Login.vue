<template>
  <v-container
    id="login"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="5"
      >
        <v-banner
          id="login-banner"
          elevation="16"
          :style="{backgroundColor : 'white'}"
        >
          <v-img
            height="250"
            src="@/assets/SILAE.png"
          />
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="login"
          >
            <p v-if="incorrectAuth">
              Incorrect username or password entered - please try again
            </p>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              prepend-icon="mdi-account"
              required
            />
            <v-text-field
              v-model="password"
              prepend-icon="mdi-account-key"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="Mot de pass"
              hint="At least 8 characters"
              class="input-group--focused"
              required
              @click:append="show2 = !show2"
            />
            <br>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
            >
              Sing in
            </v-btn>
          </v-form>
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      incorrectAuth: false,
      email: '',
      user: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      show2: false,
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }),
    mounted: function () {
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      // reset () {
      //   this.$refs.form.reset()
      // },
      login () {
        this.$store.dispatch('userLogin', {
          username: this.email,
          password: this.password,
        })
          .then(() => {
            this.$session.start()
            this.$session.set('jwt', this.$store.state.accessToken)
            this.$router.push('/list_salarie')
            location.reload()
          })
          .catch(err => {
            console.log(err)
            this.incorrectAuth = true
          })
      },
    },
  }
</script>
