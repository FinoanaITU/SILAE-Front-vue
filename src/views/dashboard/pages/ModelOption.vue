<template>
  <v-container
    id="ModelOption"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-cogs"
      title="Configuration model bulletin de transmition"
      class="px-5 py-3"
    >
      <v-card v-if="!hideAll">
        <v-col cols="12">
          <v-row class="mx-auto">
            <v-col cols="5">
              <v-autocomplete
                v-model="modelSelectedName"
                :items="listModel"
                filled
                color="blue"
                label="model disponible"
              />
            </v-col>
            <v-col cols="3">
              <v-btn
                color="primary"
                @click="selectedModel"
              >
                valider
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-speed-dial
                v-model="fab"
                :top="true"
                :right="true"
                :open-on-hover="true"
                direction="left"
                transition="slide-y-reverse"
                style="float: right;"
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
                      mdi-cog-transfer-outline
                    </v-icon>
                  </v-btn>
                </template>
                <v-btn
                  fab
                  dark
                  small
                  color="red"
                  @click="dialogDelete = true"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  small
                  color="cyan"
                  @click="dialogNewModel = true"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-speed-dial>
              <v-fab-transition v-if="update ||newModel">
                <v-btn
                  :loading="sendLoad"
                  fab
                  color="primary"
                  large
                  dark
                  bottom
                  left
                  class="v-btn--example"
                  @click="sendModelModif"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-send-check
                      </v-icon>
                    </template>
                    <span v-if="update && !newModel"> valider modification</span>
                    <span v-else> Ajouter nouveaux model</span>
                  </v-tooltip>
                </v-btn>
              </v-fab-transition>
            </v-col>
          </v-row>
        </v-col>
        <v-tabs
          v-model="tab"
          centered
          icons-and-text
        >
          <v-tab
            href="#tab-1"
            @click="haut = true"
          >
            Bulletin haut
          </v-tab>

          <v-tab
            href="#tab-2"
            @click="haut = false"
          >
            Bulletin bas
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
            value="tab-1"
          >
            <v-card flat>
              <v-row class="mx-auto">
                <v-col cols="7">
                  <v-data-table
                    :headers="modelHeadears"
                    :items="modelData"
                    :items-per-page="50"
                    group-key="type"
                    sort-by="type"
                    group-by="type"
                    class="elevation-5"
                    :show-group-by="true"
                    hide-default-footer
                    hide-default-header
                  >
                    <template v-slot:group.header="{ group }">
                      <td id="group-headers">
                        <span> {{ group }} </span>
                      </td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            color="red"
                            dark
                            v-bind="attrs"
                            small
                            class="mr-2"
                            v-on="on"
                            @click="deleteElementTab(item, 'modelData')"
                          >
                            mdi-delete-forever
                          </v-icon>
                        </template>
                        <span>suprimer</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="5">
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="text-center">
                      <div class="my-2">
                        <v-btn
                          tile
                          color="green darken-2"
                          class="elevation-5"
                          style="margin-left: 17px;"
                          @click="selectDialog('Absence', 'green darken-2')"
                        >
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Absence
                        </v-btn>
                      </div>
                      <br>
                      <div class="my-2">
                        <v-btn
                          tile
                          color="deep-orange darken-3"
                          class="elevation-5"
                          @click="selectDialog('Heure', 'deep-orange darken-3')"
                        >
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Heure
                        </v-btn>
                      </div>
                      <br>
                      <div class="my-2">
                        <v-btn
                          tile
                          color="cyan lighten-1"
                          class="elevation-5"
                          @click="selectDialog('Prime', 'cyan lighten-1')"
                        >
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Prime
                        </v-btn>
                      </div>
                      <br>
                      <div class="my-2">
                        <v-btn
                          tile
                          color="orange darken-3"
                          class="elevation-5"
                          @click="selectDialog('Autre', 'orange darken-3')"
                        >
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Autre
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-col>
                <v-dialog
                  v-model="dialogAddMotif"
                  transition="dialog-top-transition"
                  max-width="600"
                >
                  <v-card>
                    <v-toolbar
                      :color="selectedBtnColor"
                      dark
                    >
                      Ajouter nouvelle motifs {{ selectedBtnName }}
                    </v-toolbar>
                    <v-card-text>
                      <v-col cols="5">
                        <v-switch
                          v-model="newMotif"
                          :color="selectedBtnColor"
                          label="Nouvelle motif"
                        />
                      </v-col>
                      <v-col cols="7">
                        <v-autocomplete
                          v-if="!newMotif"
                          v-model="motifToAdd"
                          :items="motifList"
                          label="motifs disponible"
                        />
                        <v-text-field
                          v-else
                          v-model="motifToAdd"
                          label="nouvelle motif"
                        />
                      </v-col>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        text
                        @click="dialogAddMotif = false"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        text
                        @click="addMotif()"
                      >
                        Ajouter
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="dialogNewModel"
                  transition="dialog-top-transition"
                  max-width="600"
                >
                  <v-card>
                    <v-toolbar
                      color="primary"
                      dark
                    >
                      Nouveaux model
                    </v-toolbar>
                    <v-card-text>
                      <v-col cols="7">
                        <v-text-field
                          v-model="nameNewModel"
                          label="Nom du model"
                        />
                      </v-col>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        text
                        @click="dialogNewModel = false"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        text
                        @click="newModelCreate"
                      >
                        Créer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </v-card>
          </v-tab-item>
          <v-tab-item
            value="tab-2"
          >
            <v-card flat>
              <v-row class="mx-auto">
                <v-col cols="7">
                  <v-data-table
                    :headers="modelHeadears"
                    :items="modelBasData"
                    :items-per-page="50"
                    group-key="type"
                    sort-by="type"
                    group-by="type"
                    class="elevation-5"
                    :show-group-by="true"
                    hide-default-footer
                    hide-default-header
                  >
                    <template v-slot:group.header="{ group }">
                      <td id="group-headers">
                        <span> {{ group }} </span>
                      </td>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            color="red"
                            dark
                            v-bind="attrs"
                            small
                            class="mr-2"
                            v-on="on"
                            @click="deleteElementTab(item,'modelBasData')"
                          >
                            mdi-delete-forever
                          </v-icon>
                        </template>
                        <span>suprimer</span>
                      </v-tooltip>
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="5">
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <div class="text-center">
                      <div class="my-2">
                        <v-btn
                          tile
                          color="green darken-2"
                          class="elevation-5"
                          style="margin-left: 17px;"
                          @click="selectDialog('Indemniter', 'green darken-2')"
                        >
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Indemniter
                        </v-btn>
                      </div>
                      <br>
                      <div class="my-2">
                        <v-btn
                          tile
                          color="deep-orange darken-3"
                          class="elevation-5"
                          @click="selectDialog('Autre', 'deep-orange darken-3')"
                        >
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          Autre
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </base-material-card>
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
            Vous ête sur le point de suprimer le model  <strong>{{ modelSelectedName }}</strong>
          </v-col>
          <div class="py-3">
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDelete = false"
            >
              annuler
            </v-btn>
            <v-btn
              color="red"
              text
              @click="deleteModel"
            >
              Confirmer
            </v-btn>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { getAPI } from '../../../axios-api'
  export default {
    name: 'TableauTransmition',
    data () {
      return {
        hideAll: false,
        modelHeadears: [
          { text: 'Libelle', value: 'libelle', align: 'start', groupable: false },
          { text: 'Type', value: 'type', align: 'right' },
          { text: ' ', value: 'actions' },
        ],
        modelData: [],
        modelBasData: [],
        listModel: [],
        motifToAdd: '',
        modelSelectedName: '',
        nameNewModel: '',
        selectedBtnColor: '',
        selectedBtnName: '',
        dialogAddMotif: false,
        dialogNewModel: false,
        motifList: [],
        dataMotifHeure: [],
        dataMotifAbsence: [],
        dataMotifPrime: [],
        dataMotifAutre: [],
        dataMotifIndemniter: [],
        allMotifs: [],
        newMotif: false,

        update: false,
        newModel: false,
        fab: false,
        dialogDelete: false,
        haut: true,
        sendLoad: false,

        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },

    computed: {
      ...mapState(['societeEncours']),
    },

    created () {
      this.getSocieteModel()
      this.getAllMotif()
    },

    methods: {
      getSocieteModel () {
        getAPI.post('bulletin/liste-model', {
          idSociete: this.societeEncours[0].idSociete,
        }).then((response) => {
          this.modelSelectedName = response.data[0].nomModel
          this.selectedModel()
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i].nomModel)
            this.listModel.push(response.data[i].nomModel)
          }
        })
      },

      selectedModel () {
        this.loadingCube(true)
        this.update = false
        this.newModel = false
        getAPI.post('bulletin/select-model', {
          idSociete: this.societeEncours[0].idSociete,
          nomModel: this.modelSelectedName,
        }).then((response) => {
          console.log(response.data)
          var data = response.data
          this.modelData = []
          this.modelBasData = []
          data.forEach(element => {
            if (element.isHaut === true) {
              this.modelData.push(element)
            } else {
              this.modelBasData.push(element)
            }
          })
          this.loadingCube(false)
        }).catch((error) => {
          this.showNotification(error, 'error')
          this.loadingCube(false)
        })
      },

      getAllMotif () {
        getAPI.post('bulletin/all-motifs', {
          idSociete: this.societeEncours[0].idSociete,
        }).then((response) => {
          var data = response.data
          console.log(data)
          this.allMotifs = data
          this.dataMotifHeure = []
          this.dataMotifAbsence = []
          this.dataMotifPrime = []
          this.dataMotifAutre = []
          this.dataMotifIndemniter = []
          for (let i = 0; i < data.length; i++) {
            switch (data[i].type) {
              case 'Heure':
                this.dataMotifHeure.push(data[i].libelle)
                break
              case 'Absence':
                this.dataMotifAbsence.push(data[i].libelle)
                break
              case 'Prime':
                this.dataMotifPrime.push(data[i].libelle)
                break
              case 'Autre':
                this.dataMotifAutre.push(data[i].libelle)
                break
              case 'Indemniter':
                console.log(data[i])
                this.dataMotifIndemniter.push(data[i].libelle)
                break
            }
          }
        })
      },

      selectDialog (bntName, dialogColor) {
        this.dialogAddMotif = true
        this.selectedBtnName = bntName
        this.selectedBtnColor = dialogColor
        this.motifList = this['dataMotif' + bntName]
      },

      addMotif () {
        var newData = {}
        var nameModelData = this.haut ? 'modelData' : 'modelBasData'
        for (let i = 0; i < this.allMotifs.length; i++) {
          if (this.allMotifs[i].libelle === this.motifToAdd) {
            newData = this.allMotifs[i]
          }
        }
        if (Object.keys(newData).length === 0) {
          newData = { libelle: this.motifToAdd, type: this.selectedBtnName }
        }
        var existHaut = this.checkExits(newData, this.modelData)
        var existBas = this.checkExits(newData, this.modelBasData)
        if (!existHaut && !existBas && this.motifToAdd !== '') {
          newData.isHaut = this.haut
          this[nameModelData].push(newData)
        } else {
          var message = this.motifToAdd === '' ? 'veilller selectionner un motif' : 'le motif existe déja'
          this.showNotification(message, 'error')
        }
        this.dialogAddMotif = false
        this.motifToAdd = ''
        this.newMotif = false
        this.update = true
      },

      deleteElementTab (item, nameData) {
        var elementIndex = this[nameData].indexOf(item)
        this[nameData].splice(elementIndex, 1)
        this.update = true
      },

      newModelCreate () {
        this.listModel.push(this.nameNewModel)
        this.modelSelectedName = this.nameNewModel
        this.dialogNewModel = false
        this.selectedModel()
        this.getAllMotif()
        this.newModel = true
      },

      sendModelModif () {
        this.sendLoad = true
        var dataSend = this.modelData.concat(this.modelBasData)
        console.log(dataSend)
        getAPI.post('bulletin/add-modif-model', {
          idSociete: this.societeEncours[0].idSociete,
          nomModel: this.modelSelectedName,
          data: dataSend,
        }).then((response) => {
          this.sendLoad = false
          if (response.data === true) {
            var message = this.newModel === false && this.update === true ? 'Modification effectuer' : 'Nouveaux model ajouter'
            this.showNotification(message, 'success')
            this.newModel = false
            this.update = false
          } else {
            this.showNotification('Une erreur est survenue', 'error')
          }
        }).catch((error) => {
          this.sendLoad = false
          this.showNotification(error, 'error')
        })
      },

      deleteModel () {
        this.dialogDelete = false
        getAPI.post('bulletin/remove-model', {
          idSociete: this.societeEncours[0].idSociete,
          nomModel: this.modelSelectedName,
        }).then((response) => {
          this.dialogDelete = false
          if (response.data === true) {
            this.showNotification('model suprimer', 'success')
            this.listModel = []
            this.getSocieteModel()
            this.getAllMotif()
          } else {
            this.showNotification('Une erreur est survenue', 'error')
          }
        }).catch((error) => {
          this.showNotification(error, 'error')
        })
      },

      checkExits (data, list) {
        var result = false
        if ('id' in data) {
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === data.id) {
              result = true
            }
          }
        }
        return result
      },
    },
  }
</script>

<style>
    #group-headers {
        background: rgb(72 185 77 / 94%);
        border-radius: 8px;
        border-bottom-color: white;
        color: white;
    }
    #lateral .v-btn--example {
    bottom: 0;
    position: absolute;
    margin: 0 0 16px 16px;
  }
</style>
