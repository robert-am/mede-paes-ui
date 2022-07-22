<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>Vista de Usuarios</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="900px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Nuevo Usuario
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
                        v-model="editedItem.UserName"
                        label="Nombre Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.email"
                        label="Correo"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.status"
                        label="Estado"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Desea Eliminar el Usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-icon :color="getEstado(item.enable)" dark>
        {{(item.status) === true ? "mdi-check-circle-outline" : "mdi-close-circle-outline" }}
      </v-icon>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nro',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Nombre Completo', value: 'fullName' },
      { text: 'Cedula', value: 'document' },
      { text: 'Cargo', value: 'jobtitle' },
      { text: 'Celular', value: 'cellPhone' },
      { text: 'Correo Personal', value: 'personalEmail' },
      { text: 'Aprobacion', value: 'approval' },
      { text: 'Corre Corporativo', value: 'corporateEmail' },
      { text: 'Usuario ESAN', value: 'esanUser' },
      { text: 'Tipo', value: 'type' },
      {text: 'agentCode', value: 'agentCode'},
      { text: 'Estado', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      fullName: '',
      document: '',
      jobtitle: '',
      cellPhone: '',
      personalEmail: '',
      approval: '',
      corporateEmail: '',
      esanUser: '',
      agentCode: '',
      status: ''
    },
    defaultItem: {
      id: '',
      nameComplete: '',
      document: '',
      position: '',
      phone: '',
      ePersonal: '',
      approval: '',
      eCoorp: '',
      esan: '',
      status: ''
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
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
    this.initialize()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          id: '1',
          nameComplete: 'GLORIA CRISTINA CASTAÑO ZULUAGA',
          document: '43278547',
          position: 'INTERVENTOR EJECUTOR DE CAMPO',
          phone: '3122606734',
          ePersonal: 'CRISTINA0124@GMAIL.COM ',
          approval: 'Si',
          eCoorp: 'EJECUTOR 1',
          esan: '',
          status: true
        },
        {
          id: '2',
          nameComplete: 'HUMBERTO CARLOS FLOREZ ROSSO',
          document: '78746253',
          position: 'INTERVENTOR EJECUTOR DE CAMPO',
          phone: '3126214019',
          ePersonal: 'FLOREZHUMBERTOCARLOS@HOTMAIL.COM',
          approval: 'Pendiente aprobación',
          eCoorp: 'EJECUTOR 30',
          esan: '',
          status: true
        },
        {
          id: '3',
          nameComplete: 'GLORIA EMILSEN GAVIRIA LLANOS',
          document: '43603765',
          position: 'INTERVENTOR EJECUTOR DE PLANTA',
          phone: '3003572550',
          ePersonal: 'GLORIAEGAVIRIAL@GMAIL.COM',
          approval: 'Aprobada para Campo - Pendiente aprobación para Planta',
          eCoorp: 'EJECUTOR 51\n',
          esan: '',
          status: false
        }
      ]
    },

    getEstado(status) {
      console.log(status);
      if (status === true ) return "green";
      else return "red";
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
  },
}
</script>