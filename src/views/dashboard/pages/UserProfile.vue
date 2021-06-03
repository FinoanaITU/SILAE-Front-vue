<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        :md="mdCols"
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
              <v-expansion-panels v-model="form.formOpen">
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
                          @submit.prevent="submit('form','gestion-salarie/ajout-identifiant')"
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
                                    <v-subheader>Nom de naissance*</v-subheader>
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
                                    <v-subheader>Nom marital*:</v-subheader>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="form.nomMarital"
                                      color="blue darken-2"
                                      required
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Prenom*:</v-subheader>
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
                                    <v-subheader>NIR*:</v-subheader>
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
                                          :rules="rules.required"
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
                                  label="Code pays et pays de naissance*"
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
              <v-expansion-panels v-model="formCoordonee.formOpen">
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
                          @submit.prevent="submit('formCoordonee','gestion-salarie/ajout-coordonee')"
                        >
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="4">
                                    <v-subheader>Voie :*</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="6"
                                  >
                                    <v-text-field
                                      v-model="formCoordonee.voie"
                                      :rules="rules.name"
                                      color="blue darken-2"
                                      required
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-row>
                                <v-col cols="4">
                                  <v-subheader>Complément :*</v-subheader>
                                </v-col>
                                <v-col
                                  cols="6"
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
                                    v-model="formCoordonee.paysNom"
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
              <br>
              <v-expansion-panels v-model="formBank.formOpen">
                <v-expansion-panel>
                  <v-expansion-panel-header disable-icon-rotate>
                    Information bancaires
                    <template v-slot:actions>
                      <v-icon
                        v-if="formBank.formValid"
                        color="teal"
                      >
                        mdi-check
                      </v-icon>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container class="py-0">
                      <div class="d-flex flex-row-reverse">
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="red"
                          @click="dupliquerForm('formBank.bankList','bankForm')"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="primary"
                          @click="suprimerDupliqueForm('formBank.bankList')"
                        >
                          <v-icon dark>
                            mdi-minus
                          </v-icon>
                        </v-btn>
                      </div>
                      <v-card flat>
                        <v-form
                          ref="bank"
                          @submit.prevent="submit('formBank','gestion-salarie/ajout-infoBank')"
                        >
                          <v-container fluid>
                            <v-banner
                              v-for=" i in formBank.compteur"
                              :key="i"
                              elevation="2"
                            >
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-text-field
                                      v-model="formBank.bankList[i-1].RIB"
                                      label="RIB"
                                      color="blue darken-2"
                                      :rules="rules.numberOnly"
                                    />
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-text-field
                                      v-model="formBank.bankList[i-1].IBAN"
                                      label="IBAN"
                                      color="blue darken-2"
                                      :rules="rules.numberOnly"
                                    />
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-text-field
                                      v-model="formBank.bankList[i-1].BIC"
                                      label="BIC"
                                      color="blue darken-2"
                                      :rules="rules.numberOnly"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col cols="5">
                                    <v-checkbox
                                      v-model="formBank.bankList[i-1].virement"
                                      color="green"
                                    >
                                      <template v-slot:label>
                                        <div @click.stop="">
                                          A utilisér pour les virements
                                        </div>
                                      </template>
                                    </v-checkbox>
                                  </v-col>
                                  <v-col
                                    cols="5"
                                    sm="5"
                                  >
                                    <v-text-field
                                      v-model="formBank.bankList[i-1].plafond"
                                      label="plafond à verser"
                                      color="blue darken-2"
                                      :rules="rules.numberOnly"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-banner>
                          </v-container>
                          <v-card-actions>
                            <v-btn
                              text
                              @click="resetForm('bankForm', 'formBank.bankList','bank')"
                            >
                              annuler
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              :disabled="!fromBankIsValid"
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
              <v-expansion-panels v-model="formEmploi.formOpen">
                <v-expansion-panel>
                  <v-expansion-panel-header disable-icon-rotate>
                    Information emploi
                    <template v-slot:actions>
                      <v-icon
                        v-if="formEmploi.formValid"
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
                          ref="emploi"
                          @submit.prevent="submit('formEmploi','gestion-salarie/ajout-emploi')"
                        >
                          <v-container fluid>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-select
                                  v-model="formEmploi.codeContrat"
                                  :items="codeContratTypes"
                                  :rules="rules.animal"
                                  color="blue darken-2"
                                  label="Code contrat de travail"
                                  required
                                />
                              </v-col>
                              <v-row v-if="formEmploi.codeContrat == 'CDD'">
                                <v-col
                                  cols="4"
                                  sm="4"
                                >
                                  <v-subheader>Durée initiale du CDD :</v-subheader>
                                </v-col>
                                <v-col
                                  cols="2"
                                  sm="2"
                                >
                                  <v-text-field
                                    v-model="formEmploi.dureeInitialeCDDMois"
                                    prepend-icon="mdi-calendar"
                                    label="mois"
                                    type="number"
                                    :min="0"
                                    :max="12"
                                  />
                                </v-col>
                                <v-col
                                  cols="2"
                                  sm="2"
                                >
                                  <v-text-field
                                    v-model="formEmploi.dureeInitialeCDDJours"
                                    prepend-icon="mdi-calendar"
                                    label="jours"
                                    type="number"
                                    :min="1"
                                    :max="31"
                                  />
                                </v-col>
                              </v-row>
                              <v-col
                                cols="12"
                                sm="12"
                              >
                                <v-row>
                                  <v-col cols="4">
                                    <v-menu
                                      ref="menuDateDebut"
                                      v-model="formEmploi.menuDateDebut"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="formEmploi.dateDebut"
                                          prepend-icon="mdi-calendar"
                                          label="Date debut"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        />
                                      </template>
                                      <v-date-picker
                                        v-model="formEmploi.dateDebut"
                                        no-title
                                        scrollable
                                      >
                                        <v-spacer />
                                        <v-btn
                                          text
                                          color="blue darken-2"
                                          @click="formEmploi.menuDateDebut = false"
                                        >
                                          annuler
                                        </v-btn>
                                        <v-btn
                                          text
                                          color="blue darken-2"
                                          @click="$refs.menuDateDebut.save(formEmploi.dateDebut)"
                                        >
                                          OK
                                        </v-btn>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-col>
                                  <v-col cols="7">
                                    <v-text-field
                                      v-model="formEmploi.motifDebut"
                                      label="Motif début emploi"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col
                                v-if="formEmploi.codeContrat == 'CDD'"
                                cols="12"
                                sm="12"
                              >
                                <v-row>
                                  <v-col cols="4">
                                    <v-menu
                                      ref="menuFin"
                                      v-model="formEmploi.menuDateFin"
                                      :close-on-content-click="false"
                                      transition="scale-transition"
                                      offset-y
                                      max-width="290px"
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="formEmploi.dateFin"
                                          prepend-icon="mdi-calendar"
                                          label="Date Fin"
                                          readonly
                                          v-bind="attrs"
                                          v-on="on"
                                        />
                                      </template>
                                      <v-date-picker
                                        v-model="formEmploi.dateFin"
                                        no-title
                                        scrollable
                                      >
                                        <v-spacer />
                                        <v-btn
                                          text
                                          color="blue darken-2"
                                          @click="formEmploi.menuDateFin = false"
                                        >
                                          annuler
                                        </v-btn>
                                        <v-btn
                                          text
                                          color="blue darken-2"
                                          @click="$refs.menuFin.save(formEmploi.dateFin)"
                                        >
                                          OK
                                        </v-btn>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-col>
                                  <v-col cols="8">
                                    <v-text-field
                                      v-model="formEmploi.motifFin"
                                      label="Motif Fin emploi"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="5"
                                    sm="5"
                                  >
                                    <v-subheader>Code classification métier :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="5"
                                    sm="5"
                                  >
                                    <v-text-field
                                      v-model="formEmploi.codeClassification"
                                      label="Code classification"
                                      color="blue darken-2"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="5"
                                    sm="5"
                                  >
                                    <v-subheader>Nature de l'emploi :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="5"
                                    sm="5"
                                  >
                                    <v-text-field
                                      v-model="formEmploi.nature"
                                      label="nature"
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
                                    <v-subheader>Salaire de brute :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-text-field
                                      v-model="formEmploi.salaireBase"
                                      label="salaire"
                                      color="blue darken-2"
                                      :rules="rules.numberOnly"
                                    />
                                  </v-col>
                                  <v-col
                                    cols="4"
                                    sm="4"
                                  >
                                    <v-radio-group
                                      v-model="formEmploi.salaireType"
                                      row
                                    >
                                      <v-radio
                                        label="Mensuel"
                                        value="mensuel"
                                      />
                                      <v-radio
                                        label="Horaire"
                                        value="horaire"
                                      />
                                    </v-radio-group>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col
                                    cols="5"
                                    sm="5"
                                  >
                                    <v-subheader>Heure mensuelles normales :</v-subheader>
                                  </v-col>
                                  <v-col
                                    cols="2"
                                    sm="2"
                                  >
                                    <v-text-field
                                      v-model="formEmploi.heureMensuellees"
                                      label="Heure"
                                      color="blue darken-2"
                                      type="number"
                                      :min="1"
                                      :rules="rules.required"
                                    />
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-container>
                          <v-card-actions>
                            <v-btn
                              text
                              @click="resetForm('emploiForm','formEmploi','emploi')"
                            >
                              annuler
                            </v-btn>
                            <v-spacer />
                            <v-btn
                              :disabled="!formEmploiIsValid"
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
        v-if="idSalarie != 0"
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h4 class="text-h3 font-weight-light mb-3 black--text">
              {{ salarieRecap.nom }} {{ salarieRecap.prenom }}
            </h4>

            <h6 class="text-h4 mb-1 grey--text">
              date de creation : {{ salarieRecap.dateEntrer }}
            </h6>

            <h6 class="text-h4 mb-1 grey--text">
              status : {{ salarieRecap.statusCreation }}
            </h6>

            <!-- <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human
              foundation in truth And I love you like Kanye loves Kanye I love
              Rick Owens’ bed design but the back is...
            </p> -->

            <!-- <v-btn
              color="success"
              rounded
              class="mr-0"
            >
              Follow
            </v-btn> -->
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  import { getAPI } from '../../../axios-api'
  export default {
    data () {
      // data object to send
      // var dataToSend = Object
      const defaultForm = Object.freeze({
        matricule: '',
        matriculeInterne: '',
        nomDeNaissance: '',
        nomMarital: '',
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
        formOpen: false,
        dataServer: false,
      })
      const coordoneeForm = Object.freeze({
        voie: '',
        complement: '',
        codePostal: '',
        codeVille: '',
        horsFrance: false,
        pays: '',
        paysNom: '',
        telDomicile: '',
        telPortable: '',
        telBureau: '',
        telPortablePro: '',
        email: '',
        formValid: false,
        emailValid: '',
        formOpen: false,
        dataServer: false,
      })

      const bankForm = Object.freeze({
        RIB: '',
        IBAN: '',
        BIC: '',
        virement: false,
        plafond: '',
      })

      const emploiForm = Object.freeze({
        codeContrat: '',
        dateDebut: '',
        motifDebut: '',
        motifFin: '',
        dateFin: '',
        codeClassification: '',
        nature: '',
        salaireBase: '',
        salaireType: 'mensuel',
        heureMensuellees: '',
        menuDateDebut: false,
        menuDateFin: false,
        dureeInitialeCDDMois: 0,
        dureeInitialeCDDJours: 1,
        formValid: false,
        dataServer: false,
        formOpen: false,
      })
      return {
        form: Object.assign({}, defaultForm),
        formCoordonee: Object.assign({}, coordoneeForm),
        formBank: {
          compteur: 1,
          paiementEspece: '',
          formValid: false,
          dataServer: false,
          formOpen: false,
          bankList: [Object.assign({}, bankForm)],
        },
        formEmploi: Object.assign({}, emploiForm),
        rules: {
          required: [value => !!value || 'Champs obligatoire'],
          animal: [val => (val || '').length > 0 || 'Champs obligatoire'],
          name: [val => (val || '').length > 0 || 'Champs obligatoire'],
          numberOnly: [val => this.numberOnly(val)],
          tel: [val => this.checkNumber(val)],
          email: [value => this.checkValiditerEmail(value)],
        },
        civiliteTypes: ['Monsieur', 'Madame', 'Mademoisele'],
        sFTypes: ['Marié', 'Célibataire'],
        insseeTypes: ['152', '3256'],
        paysTypes: ['FR', 'US'],
        codeContratTypes: ['CDI', 'CDD'],
        conditions: false,
        snackbar: false,
        defaultForm,
        coordoneeForm,
        bankForm,
        emploiForm,
        idSalarie: 0,
        salarieRecap: [],
        mdCols: 8,
      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.matricule &&
          this.form.civilite &&
          this.form.nomDeNaissance &&
          this.form.nomMarital &&
          this.form.prenom &&
          this.form.nir &&
          this.form.dateNaissance &&
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
        // this.$utils.exportedClass('test mety')
        // this.dupliquerForm('compteur', 'formBank.bankList', 'bankForm')
        return telComplet
      },

      fromBankIsValid () {
        var result = ''
        for (var i = 0; i < this.formBank.compteur; i++) {
          result = this.formBank.bankList[i].RIB &&
            this.formBank.bankList[i].IBAN &&
            this.formBank.bankList[i].BIC &&
            this.formBank.bankList[i].plafond
        }
        return result
      },

      formEmploiIsValid () {
        var result = this.formEmploi.codeContrat &&
          this.formEmploi.dateDebut &&
          this.formEmploi.nature &&
          this.formEmploi.salaireBase &&
          this.formEmploi.heureMensuellees
        if (this.formEmploi.codeContrat === 'CDD') {
          result = result &&
            this.formEmploi.dureeInitialeCDDMois &&
            this.formEmploi.dureeInitialeCDDJours &&
            this.formEmploi.dateFin
        }
        return result
      },
    },
    watch: {
      '$route.params': {
        handler () {
          this.idSalarie = this.$route.params.idSalarie
          if (this.idSalarie === 0) {
            this.reinitialiseData()
            this.mdCols = 12
          }
        },
        immediate: true,
      },
    },
    created () {
      this.idSalarie = this.$route.params.idSalarie
      console.log('crete ato = ' + this.idSalarie)
      this.getAllInfoSalarie()
      var md = 12
      this.mdCols = md ? this.idSalarie !== 0 : 8
    },
    methods: {
      resetForm (nameForm, dataForm, formRef) {
        var accesTab = dataForm.split('.')
        if (accesTab.length >= 2) {
          Vue.set(this[accesTab[0]], [accesTab[1]], [Object.assign({}, this[nameForm])])
          this[accesTab[0]].compteur = 1
          this[accesTab[0]].paiementEspece = ''
        } else {
          console.log(this[accesTab[0]])
          // this.$refs[formRef].reset()
          this[accesTab[0]] = Object.assign({}, this[nameForm])
        }
        this[accesTab[0]].formValid = false
      },
      submit (nameVarForm, routeApiName) {
        this[nameVarForm].formValid = true
        this[nameVarForm].formOpen = true
        this.snackbar = true
        var data = nameVarForm !== 'formBank' ? this[nameVarForm] : this[nameVarForm].bankList
        console.log(typeof data)
        data.idSalarie = this.idSalarie
        console.log(data)
        getAPI.post(routeApiName,
                    {
                      data: data,
                      idSalarie: this.idSalarie,
                    }).then((response) => {
          console.log(response.data)
        })
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
      getAllInfoSalarie () {
        if (this.idSalarie !== 0) {
          getAPI.post('gestion-salarie/all-infoSalarie',
                      {
                        data: { idSalarie: this.idSalarie },
                      }).then((response) => {
            console.log(response.data)
            var dataServer = response.data
            this.salarieRecap = dataServer.salarieRecap
            if (dataServer.identification != null) {
              this.form = response.data.identification
              this.form.menuDateNaissance = false
              this.form.formValid = true
              this.form.dataServer = true
            }
            if (dataServer.emploi != null) {
              this.formEmploi = dataServer.emploi
              this.formEmploi.menuDateDebut = false
              this.formEmploi.menuDateFin = false
              this.formEmploi.dureeInitialeCDDMois = 0
              this.formEmploi.dureeInitialeCDDJours = 1
              this.formEmploi.formValid = true
              this.formEmploi.dataServer = true
            }
            if (dataServer.coordonnees != null) {
              this.formCoordonee = dataServer.coordonnees
              this.formCoordonee.formValid = true
              this.formCoordonee.dataServer = true
            }
            if (dataServer.infoBank) {
              this.formBank.bankList = dataServer.infoBank
              this.formBank.compteur = dataServer.infoBank.length
              this.formBank.formValid = true
              this.formBank.dataServer = true
            }
          })
        }
      },
      reinitialiseData () {
        this.resetForm('defaultForm', 'form', 'identificationSalarie')
        this.resetForm('coordoneeForm', 'formCoordonee', 'coordonnee')
        this.resetForm('bankForm', 'formBank.bankList', 'bank')
        this.resetForm('emploiForm', 'formEmploi', 'emploi')
      },
    },
  }
</script>
