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
              <v-expansion-panels v-model="form.formValid">
                <v-expansion-panel>
                  <v-expansion-panel-header disable-icon-rotate>
                    Identification du salarié
                    <template v-slot:actions>
                      <v-icon
                        v-if="form.formValid"
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
                          @submit.prevent="submit('form')"
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
                                  color="blue darken-2"
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
                                          color="blue darken-2"
                                          @click="form.menuDateNaissance = false"
                                        >
                                          annuler
                                        </v-btn>
                                        <v-btn
                                          text
                                          color="blue darken-2"
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
                              @click="resetForm('defaultForm','form','identificationSalarie')"
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
              <br>
              <v-expansion-panels v-model="formCoordonee.formValid">
                <v-expansion-panel>
                  <v-expansion-panel-header disable-icon-rotate>
                    Coordonnées
                    <template v-slot:actions>
                      <v-icon
                        v-if="formCoordonee.formValid"
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
                          ref="coordonnee"
                          @submit.prevent="submit('formCoordonee')"
                        >
                          <v-container fluid>
                            <v-row>
                              <v-row>
                                <v-col cols="4">
                                  <v-subheader>Voie :*</v-subheader>
                                </v-col>
                                <v-col
                                  cols="8"
                                >
                                  <v-text-field
                                    v-model="formCoordonee.voie"
                                    :rules="rules.name"
                                    color="blue darken-2"
                                    required
                                  />
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="4">
                                  <v-subheader>Complément :*</v-subheader>
                                </v-col>
                                <v-col
                                  cols="8"
                                >
                                  <v-text-field
                                    v-model="formCoordonee.complement"
                                    :rules="rules.name"
                                    color="blue darken-2"
                                    required
                                  />
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="4">
                                  <v-subheader>Code postale et ville :*</v-subheader>
                                </v-col>
                                <v-col
                                  cols="3"
                                >
                                  <v-text-field
                                    v-model="formCoordonee.codePostal"
                                    :rules="rules.name"
                                    color="blue darken-2"
                                    label="code postale"
                                    required
                                  />
                                </v-col>
                                <v-col
                                  cols="5"
                                >
                                  <v-text-field
                                    v-model="formCoordonee.codeVille"
                                    :rules="rules.name"
                                    color="blue darken-2"
                                    label="ville"
                                    required
                                  />
                                </v-col>
                              </v-row>
                              <v-col
                                cols="12"
                                sm="4"
                              />
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-checkbox
                                  v-model="formCoordonee.horsFrance"
                                  color="green"
                                >
                                  <template v-slot:label>
                                    <div @click.stop="">
                                      Domicilié hors de France
                                    </div>
                                  </template>
                                </v-checkbox>
                              </v-col>
                              <v-row>
                                <v-col
                                  cols="4"
                                  sm="4"
                                >
                                  <v-subheader>Code INSEE commune :*</v-subheader>
                                </v-col>
                                <v-col
                                  cols="4"
                                  sm="4"
                                >
                                  <v-select
                                    v-model="formCoordonee.codeINSEE"
                                    :items="insseeTypes"
                                    color="blue darken-2"
                                    label="Code INSEE commune"
                                  />
                                </v-col>
                                <v-col
                                  cols="4"
                                  sm="4"
                                >
                                  <v-text-field
                                    v-model="formCoordonee.textINSEE"
                                    :rules="rules.name"
                                    color="blue darken-2"
                                  />
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col
                                  cols="4"
                                  sm="4"
                                >
                                  <v-subheader>Pays :*</v-subheader>
                                </v-col>
                                <v-col
                                  cols="2"
                                  sm="2"
                                >
                                  <v-select
                                    v-model="formCoordonee.pays"
                                    :items="paysTypes"
                                    color="blue darken-2"
                                    label="code"
                                  />
                                </v-col>
                                <v-col
                                  cols="5"
                                  sm="5"
                                >
                                  <v-text-field
                                    v-model="formCoordonee.textINSEE"
                                    :rules="rules.name"
                                    color="blue darken-2"
                                  />
                                </v-col>
                              </v-row>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-subheader>Tel domicile :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    sm="6"
                                  >
                                    <v-text-field
                                      v-model="formCoordonee.telDomicile"
                                      :rules="rules.tel"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-subheader>Tel bureau :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    sm="6"
                                  >
                                    <v-text-field
                                      v-model="formCoordonee.telBureau"
                                      :rules="rules.tel"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-subheader>Tel portable :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    sm="6"
                                  >
                                    <v-text-field
                                      v-model.number="formCoordonee.telPortable"
                                      :rules="rules.tel"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-subheader>Tel portable pro :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    sm="6"
                                  >
                                    <v-text-field
                                      v-model.number="formCoordonee.telPortablePro"
                                      :rules="rules.tel"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-subheader>Email :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="6"
                                    sm="6"
                                  >
                                    <v-text-field
                                      v-model="formCoordonee.email"
                                      :rules="rules.email"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-card-actions>
                            <v-btn
                              text
                              @click="resetForm('coordoneeForm', 'formCoordonee','coordonnee')"
                            >
                              annuler
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              :disabled="!formCoordoneeIsValid"
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
        formValid: false,
      })
      const coordoneeForm = Object.freeze({
        voie: '',
        complement: '',
        codePostal: '',
        codeVille: '',
        horsFrance: '',
        codeINSEE: '',
        textINSEE: '',
        pays: '',
        telDomicile: '',
        telPortable: '',
        telBureau: '',
        telPortablePro: '',
        email: '',
        formValid: false,
        emailValid: '',
      })

      return {
        form: Object.assign({}, defaultForm),
        formCoordonee: Object.assign({}, coordoneeForm),
        rules: {
          required: [value => !!value || 'Champs obligatoire'],
          animal: [val => (val || '').length > 0 || 'Champs obligatoire'],
          name: [val => (val || '').length > 0 || 'Champs obligatoire'],
          tel: [val => this.checkNumber(val)],
          email: [value => this.checkValiditerEmail(value)],
        },
        civiliteTypes: ['Monsieur', 'Madame'],
        sFTypes: ['Marié', 'Célibataire'],
        insseeTypes: ['152', '3256'],
        paysTypes: ['FR', 'US'],
        conditions: false,
        snackbar: false,
        defaultForm,
        coordoneeForm,
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

      formCoordoneeIsValid () {
        var checkOther = this.formCoordonee.voie &&
          this.formCoordonee.complement &&
          this.formCoordonee.codePostal &&
          this.formCoordonee.codeVille &&
          this.formCoordonee.pays &&
          this.formCoordonee.emailValid
        var telComplet = this.verifTelComplet(checkOther)
        return telComplet
      },
    },

    methods: {
      resetForm (nameForm, dataForm, formRef) {
        this[dataForm] = Object.assign({}, this[nameForm])
        this.$refs[formRef].reset()
      },
      submit (nameVarForm) {
        this[nameVarForm].formValid = true
        this.snackbar = true
      },
      checkNumber (val) {
        if (isNaN(val) && val.length > 0) {
          return 'Numero de télephone incorrecte'
        } else {
          return true
        }
      },
      verifTelComplet (otherChamp) {
        var result = ''
        var telDomicile = this.formCoordonee.telDomicile !== '' ? this.checkNumber(this.formCoordonee.telDomicile) : false
        var telPortable = this.formCoordonee.telPortable !== '' ? this.checkNumber(this.formCoordonee.telPortable) : false
        var telBureau = this.formCoordonee.telBureau !== '' ? this.checkNumber(this.formCoordonee.telBureau) : false
        var telPortablePro = this.formCoordonee.telPortablePro !== '' ? this.checkNumber(this.formCoordonee.telPortablePro) : false
        if (!telDomicile && !telPortable && !telBureau && !telPortablePro) {
          result = ''
        } else {
          if (typeof telDomicile === 'string' || typeof telPortable === 'string' || typeof telBureau === 'string' || typeof telPortablePro === 'string') {
            result = ''
          } else {
            result = otherChamp === '' ? '' : 'ok'
          }
        }
        return result
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
    },
  }
</script>
