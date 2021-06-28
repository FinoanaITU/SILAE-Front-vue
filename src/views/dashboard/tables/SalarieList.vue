<template>
  <v-container
    id="liste-salarie"
    fluid
    tag="section"
  >
    <base-material-card
      v-if="!hideAll"
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
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  ajouter
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
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
                  </v-container>
                </v-card-text>

                <v-card-actions>
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
                </v-card-actions>
              </v-card>
            </v-dialog>
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
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-file-excel
          </v-icon>
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
    </base-material-card>
  </v-container>
</template>

<script>
  import { getAPI } from '../../../axios-api'
  import router from '../../../router'
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: '',
      salarieSuprimer: '',
      hideAll: true,
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
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    },

    methods: {
      initialize () {
        this.getAllInfoSalarie()
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
    },
  }
</script>

<style>

</style>
