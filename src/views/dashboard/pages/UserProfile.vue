<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
              Information employer
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Complete le profile
            </div>
          </template>
          <v-form>
            <template>
              <v-expansion-panels v-model="form.fromValid">
                <v-expansion-panel>
                  <v-expansion-panel-header disable-icon-rotate>
                    Identification du salarié
                    <template v-slot:actions>
                      <v-icon
                        v-if="form.fromValid"
                        color="teal"
                      >
                        mdi-check
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container class="py-0">
                      <v-card flat>
                        <v-form
                          ref="identificationSalarie"
                          @submit.prevent="submit"
                        >
                          <v-container fluid>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-text-field
                                  v-model="form.matricule"
                                  :rules="rules.name"
                                  color="blue darken-2"
                                  label="Matricule"
                                  required
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-text-field
                                  v-model="form.matriculeInterne"
                                  :rules="rules.name"
                                  color="blue darken-2"
                                  label="Matricule interne"
                                  required
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-select
                                  v-model="form.civilite"
                                  :items="civiliteTypes"
                                  :rules="rules.animal"
                                  color="pink"
                                  label="Civilité"
                                  required
                                />
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Nom de naissance</v-subheader>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="form.nomDeNaissance"
                                      :rules="rules.name"
                                      color="blue darken-2"
                                      required
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Nom marital</v-subheader>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="form.nomMarital"
                                      :rules="rules.name"
                                      color="blue darken-2"
                                      required
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Nom usuel</v-subheader>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="form.nomUsuel"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Prenom</v-subheader>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="form.prenom"
                                      :rules="rules.name"
                                      color="blue darken-2"
                                      required
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>NIR</v-subheader>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="form.nir"
                                      :rules="rules.name"
                                      color="blue darken-2"
                                      required
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-select
                                  v-model="form.situationFamiliale"
                                  :items="sFTypes"
                                  label="Situation familiale"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="12"
                              >
                                <v-divider
                                  inset
                                />
                                <v-subheader
                                  class="text-h5"
                                >
                                  Information naissance
                                </v-subheader>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Date de naissance</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="8"
                                    sm="6"
                                    md="4"
                                  >
                                    <v-menu
                                      ref="menu"
                                      v-model="form.menuDateNaissance"
                                      :close-on-content-click="false"
                                      :return-value.sync="form.dateNaissance"
                                      transition="scale-transition"
                                      offset-y
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="form.dateNaissance"
                                          prepend-icon="mdi-calendar"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        />
                                      </template>
                                      <v-date-picker
                                        v-model="form.dateNaissance"
                                        no-title
                                        scrollable
                                      >
                                        <v-spacer />
                                        <v-btn
                                          text
                                          color="primary"
                                          @click="form.menuDateNaissance = false"
                                        >
                                          annuler
                                        </v-btn>
                                        <v-btn
                                          text
                                          color="primary"
                                          @click="$refs.menu.save(form.dateNaissance)"
                                        >
                                          OK
                                        </v-btn>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-text-field
                                  v-model="form.departementNaissance"
                                  :rules="rules.name"
                                  color="blue darken-2"
                                  label="Département et commune de naissance"
                                  required
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-text-field
                                  v-model="form.paysNaissance"
                                  :rules="rules.name"
                                  color="blue darken-2"
                                  label="Code pays et pays de naissance"
                                  required
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-card-actions>
                            <v-btn
                              text
                              @click="resetForm"
                            >
                              annuler
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              :disabled="!formIsValid"
                              text
                              color="primary"
                              type="submit"
                            >
                              Valider
                            </v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="text-h4 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="text-h3 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human
              foundation in truth And I love you like Kanye loves Kanye I love
              Rick Owens’ bed design but the back is...
            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      // data object to send
      // var dataToSend = Object
      const defaultForm = Object.freeze({
        matricule: '',
        matriculeInterne: '',
        nomDeNaissance: '',
        nomMarital: '',
        nomUsuel: '',
        prenom: '',
        nir: '',
        situationFamiliale: '',
        bio: '',
        civilite: '',
        menuDateNaissance: false,
        dateNaissance: '',
        departementNaissance: '',
        paysNaissance: '',
        fromValid: false,
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          animal: [val => (val || '').length > 0 || 'This field is required'],
          name: [val => (val || '').length > 0 || 'This field is required'],
        },
        civiliteTypes: ['Monsieur', 'Madame'],
        sFTypes: ['Marié', 'Célibataire'],
        conditions: false,
        snackbar: false,
        defaultForm,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.civilite &&
          this.form.nomDeNaissance &&
          this.form.nomMarital &&
          this.form.prenom &&
          this.form.nir &&
          this.form.dateNaissance &&
          this.form.departementNaissance &&
          this.form.paysNaissance
        )
      },
    },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.identificationSalarie.reset()
      },
      submit () {
        this.form.fromValid = true
        this.snackbar = true
      },
    },
  }
</script>
