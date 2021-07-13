<template>
  <v-container
    id="ModelOption"
    fluid
    tag="section"
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
        </v-row>
      </v-col>
      <v-row class="mx-auto">
        <v-col cols="7">
          <v-data-table
            :headers="modelHeadears"
            :items="modelData"
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
                    @click="editBordereau(item)"
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
                  color="deep-orange darken-3"
                  class="elevation-5"
                  @click="getAllMotif"
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
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Autre
                </v-btn>
              </div>
              <br>
              <div class="my-2">
                <v-btn
                  tile
                  color="green darken-2"
                  class="elevation-5"
                  style="margin-left: 17px;"
                >
                  <v-icon left>
                    mdi-plus
                  </v-icon>
                  Absence
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-col>
      </v-row>
    </v-card>
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
        listModel: [],
        modelSelectedName: '',
      }
    },

    computed: {
      ...mapState(['societeEncours']),
    },

    created () {
      this.getSocieteModel()
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
        getAPI.post('bulletin/select-model', {
          idSociete: this.societeEncours[0].idSociete,
          nomModel: this.modelSelectedName,
        }).then((response) => {
          console.log(response.data)
          this.modelData = response.data
          this.loadingCube(false)
        })
      },

      getAllMotif () {
        getAPI.post('bulletin/all-motifs', {
          idSociete: this.societeEncours[0].idSociete,
        }).then((response) => {
          console.log(response.data)
        })
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
</style>
