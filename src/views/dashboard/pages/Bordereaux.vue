<template>
  <v-container
    id="Bordereaux"
    fluid
    tag="section"
  >
    <v-card v-if="!hideAll">
      <v-tabs
        color="blue"
        right
      >
        <v-tab>Borderaux du mois</v-tab>
        <v-tab>Mes archivers</v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-spacer />
            <v-data-table
              :headers="headers"
              :items="listSalarie"
              :search="search"
              :sort-desc="true"
              sort-by="statusCreation"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="3">
                        <v-banner
                          single-line
                        >
                          <v-icon
                            slot="icon"
                            color="blue"
                            size="30"
                          >
                            mdi-calendar-check
                          </v-icon>
                          <strong> {{ curentMonth }} </strong>
                        </v-banner>
                      </v-col>
                      <v-col cols="4">
                        <div class="text-center">
                          <v-dialog
                            v-model="dialogFilter"
                            width="300"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="red lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                              >
                                filter
                              </v-btn>
                            </template>

                            <v-sheet
                              elevation="10"
                              rounded="xl"
                            >
                              <v-sheet
                                class="pa-3 primary text-right"
                                dark
                                rounded="t-xl"
                              >
                                <v-btn icon>
                                  <v-icon>mdi-content-save-cog-outline</v-icon>
                                </v-btn>

                                <v-btn
                                  class="ml-2"
                                  icon
                                >
                                  <v-icon @click="dialogFilter = false">
                                    mdi-check-bold
                                  </v-icon>
                                </v-btn>
                              </v-sheet>

                              <div class="pa-4">
                                <v-chip-group
                                  id="filter"
                                  v-model="filtreMulti"
                                  active-class="blue"
                                  column
                                  multiple
                                >
                                  <v-chip
                                    v-for="filter in filterData"
                                    :key="filter"
                                    filter
                                    outlined
                                  >
                                    {{ filter }}
                                  </v-chip>
                                </v-chip-group>
                              </div>
                            </v-sheet>
                          </v-dialog>
                        </div>
                      </v-col>
                      <v-col
                        cols="5"
                        style="margin-top: 26px"
                      >
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Recherche"
                          single-line
                          hide-details
                          clearable
                          class="col-lg-8"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-spacer />
                  <div class="text-center">
                    <v-bottom-sheet
                      v-model="dialogDelete"
                      persistent
                    >
                      <v-sheet
                        class="text-center"
                        height="150px"
                      >
                        <v-col
                          cols="12"
                          sm="12"
                        >
                          Vous ête sur de suprimer le salarie <strong>{{ salarieSuprimer }}</strong>
                        </v-col>
                        <div class="py-3">
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeDelete"
                          >
                            annuler
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="deleteItemConfirm"
                          >
                            OK
                          </v-btn>
                        </div>
                      </v-sheet>
                    </v-bottom-sheet>
                  </div>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="primary"
                      dark
                      v-bind="attrs"
                      small
                      class="mr-2"
                      v-on="on"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>completer bordereaux</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="primary"
                      dark
                      v-bind="attrs"
                      small
                      class="mr-2"
                      v-on="on"
                      @click="deleteItem(item)"
                    >
                      mdi-file-excel
                    </v-icon>
                  </template>
                  <span>Exporter fichier Excel</span>
                </v-tooltip>
              </template>
              <template v-slot:item.statusCreation="{ item }">
                <v-chip
                  v-if="item.statusCreation == true"
                  color="green"
                  dark
                >
                  complete
                </v-chip>
                <v-chip
                  v-else
                  color="red"
                  dark
                >
                  incomplete
                </v-chip>
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
          </v-container>
        </v-tab-item>
      </v-tabs>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Open Dialog
          </v-btn>
        </template>
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
          <v-tabs vertical>
            <v-tab>
              <v-icon left>
                mdi-account
              </v-icon>
              Bulletin haut
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-lock
              </v-icon>
              Bulletin bas
            </v-tab>
            <v-tab>
              <v-icon left>
                mdi-access-point
              </v-icon>
              Option 3
            </v-tab>

            <v-tab-item>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-card
                      max-width="450"
                      elevation="3"
                    >
                      <v-card-title>
                        Absence
                      </v-card-title>
                      <v-card-text>
                        <v-col cols="12">
                          <v-col cols="12">
                            <v-autocomplete
                              v-model="absence.motif"
                              :items="absence_motifs"
                              filled
                              color="blue"
                              label="Motif abscence"
                              item-text="name"
                              item-value="name"
                            >
                              <template v-slot:item="data">
                                <template v-if="checkData(data.item) !== 'object'">
                                  <v-list-item-content v-text="data.item" />
                                </template>
                                <template v-else>
                                  <v-list-item-content>
                                    <v-list-item-title v-html="data.item.name" />
                                    <v-list-item-subtitle v-html="data.item.group" />
                                  </v-list-item-content>
                                </template>
                              </template>
                            </v-autocomplete>
                          </v-col>
                          <v-row>
                            <v-col
                              cols="5"
                              sm="5"
                              md="4"
                            >
                              <v-dialog
                                ref="modal_absences_debut"
                                v-model="absence.modalDebut"
                                :return-value.sync="absence.dateDebut"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="absence.dateDebut"
                                    label="Date Debut"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  v-model="absence.dateDebut"
                                  scrollable
                                  :max="absence.dateFin !== '' ? absence.dateFin : dateNow "
                                >
                                  <v-spacer />
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="absence.modalDebut = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs['modal_absences_debut'].save(absence.dateDebut);"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-col>
                            <v-col
                              cols="5"
                              sm="5"
                              md="4"
                            >
                              <v-dialog
                                v-if="!absence.demiJourne"
                                ref="modal_absences_fin"
                                v-model="absence.modalFin"
                                :return-value.sync="absence.dateFin"
                                persistent
                                width="290px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="absence.dateFin"
                                    label="Date Fin"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  />
                                </template>
                                <v-date-picker
                                  v-model="absence.dateFin"
                                  scrollable
                                  :min="absence.dateDebut != '' ? absence.dateDebut : dateNow"
                                >
                                  <v-spacer />
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="absence.modalFin = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs['modal_absences_fin'].save(absence.dateFin);"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                              <v-text-field
                                v-else
                                v-model="absence.heureDemiJourne"
                                label="durée"
                                type="number"
                                :min="0.5"
                              />
                            </v-col>
                            <v-col
                              cols="2"
                              sm="2"
                              md="2"
                            >
                              <v-checkbox
                                v-model="absence.demiJourne"
                                label="demi journée"
                                color="info"
                                hide-details
                              />
                            </v-col>
                            <v-btn
                              :disabled="!absenceValide"
                              text
                              color="primary"
                              @click="addToTable('absence')"
                            >
                              Ajouter
                            </v-btn>
                          </v-row>
                        </v-col>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-data-table
                      :headers="absenceHeaders"
                      :items="absenceData"
                      :items-per-page="5"
                      class="elevation-1"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                  </p>

                  <p>
                    Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                  </p>

                  <p>
                    Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                  </p>

                  <p>
                    Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                  </p>

                  <p class="mb-0">
                    Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <p>
                    Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                  </p>

                  <p class="mb-0">
                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
  import { getAPI } from '../../../axios-api'
  import router from '../../../router'
  export default {
    name: 'Bordereaux',
    data () {
      const absenceForm = Object.freeze({
        motif: '',
        dateDebut: '',
        dateFin: '',
        nombreJours: 0,
        modalDebut: false,
        modalFin: false,
        demiJourne: false,
        heureDemiJourne: 0,
      })
      return {
        absence: Object.assign({}, absenceForm),
        dialog: false,
        dialogDelete: false,
        search: '',
        salarieSuprimer: '',
        filtreMulti: [],
        hideAll: true,
        yearsMonth: ['Janvier', 'février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Séptembre', 'Octobre', 'Novembre', 'Décembre'],
        date: new Date().toISOString().substr(0, 7),
        dateNow: new Date().toISOString(),
        curentMonth: '',
        filterData: ['complete', 'incomplete'],
        modal: false,
        dialogFilter: false,
        absenceHeaders: [
          { text: 'Motif', value: 'motif' },
          { text: 'debut', value: 'dateDebut' },
          { text: 'fin', value: 'dateFin' },
          { text: 'nombre jours', value: 'nombreJours' },
          { text: 'Actions', value: 'actions' },
        ],
        absenceData: [],
        headers: [
          { text: 'Nom', value: 'nom' },
          { text: 'Prenom', value: 'prenom' },
          { text: 'Matricule', value: 'matricule' },
          { text: 'Date entrer ', value: 'dateEntrer' },
          { text: 'Informations', value: 'statusCreation' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        listSalarie: [],
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
        absence_motifs: [
          { header: 'Absences fréquentes' },
          { name: 'Maladies non professionnelle', group: 'Absences fréquentes' },
          { name: 'Accident de travail', group: 'Absences fréquentes' },
          { name: 'Congés payés', group: 'Absences fréquentes' },
          { name: 'Absence non rémunérée', group: 'Absences fréquentes' },
          { name: 'Congé sans solde', group: 'Absences fréquentes' },
          { name: 'Chômage partielle suspension intégrale', group: 'Absences fréquentes' },
          { divider: true },
          { header: 'Famille' },
          { name: 'Maternité', group: 'Famille' },
          { name: 'Paternité', group: 'Famille' },
          { name: 'Adoption', group: 'Famille' },
          { name: 'Congé de présence parentale', group: 'Famille' },
          { name: 'Congé de proche aidant', group: 'Famille' },
          { name: 'Congé de solidarité familiale', group: 'Famille' },
          { name: 'Congé parentale', group: 'Famille' },
          { name: 'Absence éventement familial', group: 'Famille' },
          { name: 'congé de deuil', group: 'Famille' },
          { divider: true },
          { header: 'Santé' },
          { name: 'Maladie non professionnelle', group: 'Santé' },
          { name: 'congé pathologique prénatal', group: 'Santé' },
          { name: 'congé pathologique post-natal', group: 'Santé' },
          { name: 'Femme enceinte dispensé de travail', group: 'Santé' },
          { name: 'Accident de travail', group: 'Santé' },
          { name: 'Accident de trajet', group: 'Santé' },
          { name: 'Temps partiel thérapeutique', group: 'Santé' },
          { divider: true },
          { header: 'Repos' },
          { name: 'Congés payés', group: 'Repos' },
          { name: 'Férié chômé', group: 'Repos' },
          { name: 'RTT', group: 'Repos' },
          { name: 'Repos compensateur ', group: 'Repos' },
          { name: 'Repos forfait jours', group: 'Repos' },
          { divider: true },
          { header: 'Absences légales' },
          { name: 'Solidarité internationale', group: 'Absences légales' },
          { name: 'Absences légale autorisé sans retenue', group: 'Absences légales' },
          { name: 'Autre absence légale avec retenue', group: 'Absences légales' },
          { name: 'Absence pour représentation des salariés ', group: 'Absences légales' },
          { name: 'Mobilité volontaire sécurisée', group: 'Absences légales' },
          { name: 'Congé sabbatique', group: 'Absences légales' },
          { name: 'Absence entrainement/compétition sportive', group: 'Absences légales' },
          { divider: true },
          { header: 'Chômage' },
          { name: 'Chômage intempéries', group: 'Chômage' },
          { name: 'Activité partielle réduction du temps', group: 'Chômage' },
          { name: 'Activité partielle suspension intégrale', group: 'Chômage' },
          { name: 'Activité partielle formation ', group: 'Chômage' },
          { name: 'Activité partielle réduction du temps - impossibilité', group: 'Chômage' },
          { name: 'Activité partielle suspension intégrale - impossibilité', group: 'Chômage' },
          { divider: true },
          { header: 'Autres' },
          { name: 'Absence non rémunérée', group: 'Autres' },
          { name: 'Absence rémunérée', group: 'Autres' },
          { name: 'Congé sans solde', group: 'Autres' },
          { name: 'Férié chômé non payé ', group: 'Autres' },
          { name: 'Cassation concertée de travail (Grève)', group: 'Autres' },
          { name: 'Mise à pied disciplinaire', group: 'Autres' },
          { name: 'Mise à pied conservatoire', group: 'Autres' },
          { name: 'Détention provisoire', group: 'Autres' },
          { name: 'Préavis non effectué', group: 'Autres' },
          { name: 'Préavis non effectué payé', group: 'Autres' },
          { name: 'Période non travaillé (CDI intermittent sans lissage)', group: 'Autres' },
          { name: "Préretraite d'entreprise (Sans rupture de contrat de travail)", group: 'Autres' },
        ],
        autoUpdate: true,
        friends: ['Sandra Adams', 'Britta Holt'],
        isUpdating: false,
        name: 'Midnight Crew',
        title: 'The summer breeze',
      }
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      absenceValide () {
        var dateValid = this.absence.demiJourne === true ? this.absence.dateDebut && this.absence.heureDemiJourne : this.absence.dateDebut && this.absence.dateFin
        return (
          this.absence.motif &&
          dateValid
        )
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.getAllInfoSalarie()
      this.curentMonth = this.yearsMonth[new Date().getMonth()] + ' ' + new Date().getFullYear()
    },

    methods: {
      initialize () {
        this.getAllInfoSalarie()
      },
      checkData (data) { return typeof data },
      remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },
      editItem (item) {
        // this.editedIndex = this.listSalarie.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        // this.dialog = true
        router.push({ name: 'Ajout Employer', params: { idSalarie: item.idSalarie } })
      },

      deleteItem (item) {
        console.log(item)
        this.editedIndex = this.listSalarie.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.salarieSuprimer = item.nom + ' ' + item.prenom
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.listSalarie.splice(this.editedIndex, 1)
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
          Object.assign(this.listSalarie[this.editedIndex], this.editedItem)
        } else {
          this.listSalarie.push(this.editedItem)
        }
        this.close()
      },
      getAllInfoSalarie () {
        this.loadingCube(true)
        getAPI.post('gestion-salarie/all-Salarie',
                    {
                      idSociete: 1,
                    }).then((response) => {
          console.log(JSON.parse(response.data))
          setTimeout(() => {
            this.loadingCube(false)
            this.hideAll = false
            this.listSalarie = JSON.parse(response.data)
          }, 1000)
        }).catch((error) => {
          this.loadingCube(false)
          this.showNotification(error, 'error')
        })
      },
      getColorStatus (status) {
        if (status === false) return 'red'
        else return 'green'
      },
      setRecherche (value) {
        var compareTo = value === 'complete'
        var newList = []
        for (var i = 0; i < this.listSalarie.length; i++) {
          if (this.listSalarie[i].statusCreation === compareTo) {
            newList.push(this.listSalarie[i])
          }
        }
        this.listSalarie = newList
      },
      addToTable (actionName) {
        if (actionName === 'absence') {
          this.absenceData.push(this.absence)
        }
      },
    },
  }
</script>

<style>
#filter{
          margin-top: 15px;
          margin-left: 32px;
        }
</style>
