<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-h4"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon> mdi-account </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Utilisateur</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="societeEncours.length > 0">
        <v-list-item-icon>
          <v-icon> mdi-domain </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ societeEncours[0].nomSociete }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />
    <v-list dense>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list
      expand
      nav
    >
      <v-list-group
        v-if="societeEncours.length > 0"
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Salarie</v-list-item-title>
        </template>

        <v-list-item
          v-for="([title, icon,nameRoute,idU], i) in admins"
          :key="i"
          link
          :to="{name: nameRoute, params: { idSalarie: idU }}"
        >
          <v-list-item-title
            link
            v-text="title"
          />

          <v-list-item-icon>
            <v-icon v-text="icon" />
          </v-list-item-icon>
          <v-list-item-content />
        </v-list-item>

        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title" />
            <v-list-item-icon>
              <v-icon v-text="icon" />
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <v-list-group
        v-if="societeEncours.length > 0"
        :value="false"
        prepend-icon="mdi-card-bulleted-outline"
      >
        <template v-slot:activator>
          <v-list-item-title>Tableau</v-list-item-title>
        </template>

        <v-list-item
          v-for="([title, icon,nameRoute], i) in bordereaux"
          :key="i"
          link
          :to="{name: nameRoute}"
        >
          <v-list-item-title
            link
            v-text="title"
          />

          <v-list-item-icon>
            <v-icon v-text="icon" />
          </v-list-item-icon>
          <v-list-item-content />
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Acceuil', icon: 'mdi-home', route: '/' },
        { text: 'Mes sociétés', icon: 'mdi-format-list-bulleted-square', route: '/list_societe' },
      ],
      admins: [
        ['Nouveaux', 'mdi-account-multiple-plus-outline', 'Ajout Employer', 0],
        ['Liste', 'mdi-playlist-edit', 'Liste salarie', 1],
      ],
      bordereaux: [
        ['Model(s)', 'mdi-cogs', 'Parametrage model'],
        ['Suivie bordereaux', 'mdi-clipboard-check-multiple-outline', 'Bordereaux'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage', 'societeEncours']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
