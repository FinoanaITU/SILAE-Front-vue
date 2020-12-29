<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <!-- <base-v-component
      heading="Simple Tables"
      link="components/simple-tables"
    /> -->

    <base-material-card
      icon="mdi-clipboard-text"
      title="Liste des salaries"
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
      <br>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            medium
            color="blue"
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-archive
          </v-icon>
          <v-icon
            medium
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            New Item
          </v-btn>
        </template> -->
        <v-card>
          <v-toolbar
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <br>
          <div class="row">
            <v-col
              cols="12"
              md="6"
            >
              <base-material-card
                color="info"
                class="px-5 py-3"
              >
                <template v-slot:heading>
                  <div class="display-2 font-weight-light">
                    Bulletin de haut
                  </div>
                </template>
                <v-card>
                  <!-- <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title> -->
                  <v-card-text>
                    <v-container>
                      <v-expansion-panels
                        v-model="panel"
                        multiple
                      >
                        <!-- <v-expansion-panel>
                          <v-expansion-panel-header>Header</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.name"
                                  label="Dessert name"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.calories"
                                  label="Calories"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.fat"
                                  label="Fat (g)"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.carbs"
                                  label="Carbs (g)"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.protein"
                                  label="Protein (g)"
                                />
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel> -->
                        <v-expansion-panel>
                          <v-expansion-panel-header>Prime execeptionnelle</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.prime.brut"
                                  label="Brute"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.prime.net"
                                  label="Net"
                                />
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Heure seuplementaire</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.heureSuplementaire.contractuelles_25"
                                  label="contractuelles 25%"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.heureSuplementaire.hors_contrat_25"
                                  label="hors contrat 25%"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.heureSuplementaire.contractuelles_50"
                                  label="contractuelles 50%"
                                />
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Absence maladie</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-col
                              cols="4"
                              sm="6"
                              md="4"
                              class="maladie-nbr-jour"
                            >
                              <v-text-field
                                v-model="bulletinHaut.absenceMaladies.nbr_jours"
                                label="Nombre jours"
                                type="number"
                                disabled
                              />
                            </v-col>
                            <v-col
                              sm="12"
                            >
                              <v-card>
                                <template>
                                  <v-fab-transition>
                                    <v-btn
                                      color="pink"
                                      fab
                                      dark
                                      small
                                      absolute
                                      top
                                      right
                                      @click="ajoutContentDate ('absenceMaladies_compteur', 'bulletinHaut.absenceMaladies.date')"
                                    >
                                      <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                  </v-fab-transition>
                                </template>
                                <template v-if="absenceMaladies_compteur > 1">
                                  <v-fab-transition>
                                    <v-btn
                                      style="margin-right: 43px"
                                      color="red"
                                      fab
                                      dark
                                      small
                                      absolute
                                      top
                                      right
                                      @click="suprimerContentDate ('absenceMaladies_compteur', 'bulletinHaut.absenceMaladies.date')"
                                    >
                                      <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                  </v-fab-transition>
                                </template>
                                <v-card-text>
                                  <v-row
                                    v-for="i in parseInt(absenceMaladies_compteur)"
                                    :key="i"
                                  >
                                    <v-col
                                      class="d-flex maladie-content"
                                      cols="12"
                                      sm="9"
                                    >
                                      <v-select
                                        v-model="bulletinHaut.absenceMaladies.date[i-1].motif"
                                        :items="absenceMaladies_motifs"
                                        label="Motif d'absence"
                                      />
                                    </v-col>
                                    <v-col
                                      cols="5"
                                      sm="5"
                                      md="4"
                                      class="date-absence"
                                    >
                                      <v-dialog
                                        :ref="'modal_absenceMaladies_debut_'+ (parseInt(i)-1)"
                                        v-model="modal_absenceMaladies_debut"
                                        :return-value.sync="bulletinHaut.absenceMaladies.date[i-1].date_debut"
                                        persistent
                                        width="290px"
                                      >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-text-field
                                            v-model="bulletinHaut.absenceMaladies.date[i-1].date_debut"
                                            label="Date Debut"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                          />
                                        </template>
                                        <v-date-picker
                                          v-model="bulletinHaut.absenceMaladies.date[i-1].date_debut"
                                          scrollable
                                        >
                                          <v-spacer />
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="modal_absenceMaladies_debut = false"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="$refs['modal_absenceMaladies_debut_'+ (parseInt(i)-1)][0].save(bulletinHaut.absenceMaladies.date[i-1].date_debut);"
                                          >
                                            OK
                                          </v-btn>
                                        </v-date-picker>
                                      </v-dialog>
                                    </v-col>
                                    <v-col
                                      v-if="bulletinHaut.absenceMaladies.date[i-1].demi_journe == false"
                                      cols="5"
                                      sm="5"
                                      md="4"
                                      class="date-absence"
                                    >
                                      <v-dialog
                                        :ref="'modal_absenceMaladies_fin_'+(parseInt(i)-1)"
                                        v-model="modal_absenceMaladies_fin"
                                        :return-value.sync="bulletinHaut.absenceMaladies.date[i-1].date_fin"
                                        persistent
                                        width="290px"
                                      >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-text-field
                                            v-model="bulletinHaut.absenceMaladies.date[i-1].date_fin"
                                            label="Date Fin"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                          />
                                        </template>
                                        <v-date-picker
                                          v-model="bulletinHaut.absenceMaladies.date[i-1].date_fin"
                                          :min="bulletinHaut.absenceMaladies.date[i-1].date_debut"
                                          scrollable
                                        >
                                          <v-spacer />
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="modal_absenceMaladies_fin = false"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="$refs['modal_absenceMaladies_fin_'+(parseInt(i)-1)][0].save(bulletinHaut.absenceMaladies.date[i-1].date_fin)"
                                          >
                                            OK
                                          </v-btn>
                                        </v-date-picker>
                                      </v-dialog>
                                    </v-col>
                                    <v-col
                                      cols="1"
                                      sm="1"
                                      md="1"
                                      class="date-absence"
                                    >
                                      <v-checkbox
                                        v-model="bulletinHaut.absenceMaladies.date[i-1].demi_journe"
                                        label="demi journée"
                                        color="info"
                                        hide-details
                                      />
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Absence congés payés</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.congePaye.nbr_jours"
                                  label="Nombre jours"
                                  type="number"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-dialog
                                  ref="modal_congePaye_debut"
                                  v-model="modal_congePaye_debut"
                                  :return-value.sync="bulletinHaut.congePaye.date_debut"
                                  persistent
                                  width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="bulletinHaut.congePaye.date_debut"
                                      label="Date Debut"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="bulletinHaut.congePaye.date_debut"
                                    scrollable
                                  >
                                    <v-spacer />
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="modal_congePaye_debut = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="$refs.modal_congePaye_debut.save(bulletinHaut.congePaye.date_debut);"
                                    >
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-dialog>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-dialog
                                  ref="modal_congePaye_fin"
                                  v-model="modal_congePaye_fin"
                                  :return-value.sync="bulletinHaut.congePaye.date_fin"
                                  persistent
                                  width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="bulletinHaut.congePaye.date_fin"
                                      label="Date Fin"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="bulletinHaut.congePaye.date_fin"
                                    :min="bulletinHaut.congePaye.date_fin"
                                    scrollable
                                  >
                                    <v-spacer />
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="modal_congePaye_fin = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="$refs.modal_congePaye_fin.save(bulletinHaut.congePaye.date_fin)"
                                    >
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-dialog>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>Autre absences</v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="bulletinHaut.autreAbsences.nbr_jours"
                                  label="Nombre jours"
                                  type="number"
                                />
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-dialog
                                  ref="modal_autreAbsences_debut"
                                  v-model="modal_autreAbsences_debut"
                                  :return-value.sync="bulletinHaut.autreAbsences.date_debut"
                                  persistent
                                  width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="bulletinHaut.autreAbsences.date_debut"
                                      label="Date Debut"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="bulletinHaut.autreAbsences.date_debut"
                                    scrollable
                                  >
                                    <v-spacer />
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="modal_autreAbsences_debut = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="$refs.modal_autreAbsences_debut.save(bulletinHaut.autreAbsences.date_debut);"
                                    >
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-dialog>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-dialog
                                  ref="modal_autreAbsences_fin"
                                  v-model="modal_autreAbsences_fin"
                                  :return-value.sync="bulletinHaut.autreAbsences.date_fin"
                                  persistent
                                  width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="bulletinHaut.autreAbsences.date_fin"
                                      label="Date Fin"
                                      prepend-icon="mdi-calendar"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </template>
                                  <v-date-picker
                                    v-model="bulletinHaut.autreAbsences.date_fin"
                                    scrollable
                                  >
                                    <v-spacer />
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="modal_autreAbsences_fin = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="$refs.modal_autreAbsences_fin.save(bulletinHaut.autreAbsences.date_fin)"
                                    >
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-dialog>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-container>
                  </v-card-text>

                  <!-- <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions> -->
                </v-card>
              </base-material-card>
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <base-material-card
                color="info"
                class="px-5 py-3"
              >
                <template v-slot:heading>
                  <div class="display-2 font-weight-light">
                    Bulletin de bas
                  </div>

                  <div class="subtitle-1 font-weight-light">
                    New employees
                  </div>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline" />
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="bulletinBas.nbrJours_repas"
                            label="Nombre jour indemnité repas"
                            type="number"
                            :min="0"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="bulletinBas.taux_remboursemment_navigo"
                            label="Taux remboursement passe Navigo"
                            type="number"
                            :min="0"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="bulletinBas.acompte"
                            label="Acompte"
                            type="number"
                            :min="0"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="bulletinBas.nbr_grand_deplacement"
                            label="number de Grands Déplacements"
                            type="number"
                            :min="0"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="bulletinBas.taux_grand_deplacement"
                            label="Taux Grands Déplacements"
                            type="number"
                            :min="0"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </base-material-card>
            </v-col>
            <v-speed-dial
              v-model="fab"
              :top="top"
              :bottom="bottom"
              :right="right"
              :left="left"
              :direction="direction"
              :open-on-hover="hover"
              :transition="transition"
            >
              <template v-slot:activator>
                <v-btn
                  v-model="fab"
                  color="blue darken-2"
                  dark
                  fab
                >
                  <v-icon v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon v-else>
                    mdi-account-circle
                  </v-icon>
                </v-btn>
              </template>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    small
                    color="green"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-clipboard-outline</v-icon>
                  </v-btn>
                </template>
                <span>Voir liste Bulletin</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    small
                    color="indigo"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Ajouter</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    dark
                    small
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Supprimer</span>
              </v-tooltip>
            </v-speed-dial>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialogDelete"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="closeDelete"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </base-material-card>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      panel: [],
      dialog: false,
      dialogDelete: false,
      search: '',
      modal_absenceMaladies_debut: false,
      modal_absenceMaladies_fin: false,
      modal_congePaye_debut: false,
      modal_congePaye_fin: false,
      modal_autreAbsences_debut: false,
      modal_autreAbsences_fin: false,
      direction: 'right',
      fab: false,
      fling: false,
      hover: true,
      tabs: null,
      top: true,
      right: false,
      bottom: true,
      left: true,
      transition: 'scale-transition',

      // Absence maladie
      absenceMaladies_compteur: 1,
      absenceMaladies_motifs: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      headers: [
        {
          text: 'Nom et prenom',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        // { text: 'Prenom', value: 'calories', sortable: false },
        { text: 'Poste', value: 'fat', sortable: false },
        { text: 'Date entrer', value: 'carbs' },
        { text: 'Salaire de base', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      bulletinBas: {
        nbrJours_repas: 0,
        taux_remboursemment_navigo: 0,
        acompte: 0,
        nbr_grand_deplacement: 0,
        taux_grand_deplacement: 0,
      },
      bulletinHaut: {
        prime: {
          Brut: 0,
          Net: 0,
        },
        heureSuplementaire: {
          contractuelles_25: 0,
          hors_contrat_25: 0,
          contractuelles_50: 0,
        },
        absenceMaladies: {
          nbr_jours: 0,
          date: [
            {
              motif: '',
              demi_journe: false,
              date_debut: new Date().toISOString().substr(0, 10),
              date_fin: new Date().toISOString().substr(0, 10),
            },
          ],
        },
        congePaye: {
          nbr_jours: 0,
          date_debut: new Date().toISOString().substr(0, 10),
          date_fin: new Date().toISOString().substr(0, 10),
        },
        autreAbsences: {
          nbr_jours: 0,
          date_debut: new Date().toISOString().substr(0, 10),
          date_fin: new Date().toISOString().substr(0, 10),
          type: '',
        },
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

      differenceJours (dateDebut, dateFin) {
        console.log('wawa')
      },

      ajoutContentDate (compteurName, tabName) {
        this[compteurName]++
        var accesTab = tabName.split('.')
        this[accesTab[0]][accesTab[1]][accesTab[2]].push({
          motif: '',
          demi_journe: false,
          date_debut: new Date().toISOString().substr(0, 10),
          date_fin: new Date().toISOString().substr(0, 10),
        })
      },
      suprimerContentDate (compteurName, tabName) {
        if (this[compteurName] > 1) {
          var index = this[compteurName] - 1
          var accesTab = tabName.split('.')
          this[accesTab[0]][accesTab[1]][accesTab[2]].splice(index, 1)
          this[compteurName]--
        }
      },
    },
  }
</script>
<style scoped>
.date-absence{
  margin-top: -37px;
}
.maladie-content{
  margin-top: -29px;
}
.maladie-nbr-jour{
  margin-bottom: -32px;
  margin-top: -17px;
}
</style>
