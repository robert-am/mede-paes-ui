<template>
  <v-data-table
      :headers="headers"
      :items="users"
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
              <span class="text-h5"><v-icon color='black' class="mb-2" dark>{{ icon }}</v-icon>{{ formTitle }}</span>
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
                        v-model="editedItem.agentCode"
                        label="Codigo del Agente"
                        disabled
                    ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.esanUser"
                        label="Usuario ESAN"
                        disabled
                    ></v-text-field>
                    </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.username"
                        label="Nombre Usuario"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.username"
                        label="Contraseña"
                        disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.firstName"
                        label="Nombres"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.lastName"
                        label="Apellidos"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.document"
                        label="Documento"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.personalEmail"
                        label="Correo Personal"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.corporateEmail"
                        label="Correo Institucional"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.cellPhone"
                        label="Celular"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-select
                        v-model="editedItem.jobTitle"
                        label="Cargo"
                        :items="items"
                    ></v-select>
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
      <v-icon :color="getEstado(item.status)" dark>
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
import authHeader from "../../middlewares/authHeaders";
import axios from "axios";

export default {
  
  data: () => ({
    dialog: false,
    dialogDelete: false,
    items: ['TÉCNICO EN GESTIÓN DOCUMENTAL','INGENIERO DE SISTEMAS GESIS', 'TECNÓLOGO EN SISTEMAS DE INFORMACIÓN', 'TÉCNICO EN MANTENIMIENTO', 'INTERVENTOR EJECUTOR DE PLANTA', 'INTERVENTOR EJECUTOR DE CAMPO'],
    headers: [
      {
        text: 'Nro',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'Codigo del Agente', value: 'agentCode'},
      { text: 'Cedula', value: 'document' },
      { text: 'Nombre Completo', value: 'firstName' },
      { text: 'Cargo', value: 'jobTitle' },
      { text: 'Celular', value: 'cellPhone' },
      { text: 'Correo Personal', value: 'personalEmail' },
      { text: 'Aprobacion', value: 'approval' },
      { text: 'Corre Corporativo', value: 'corporateEmail' },
      { text: 'Usuario ESAN', value: 'esanUser' },
      { text: 'Tipo', value: 'type' },
      { text: 'Estado', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id:'',
      agentCode: null,
      approval: null,
      cellPhone: '',
      corporateEmail: null,
      document: '',
      esanUser: null,
      firstName: '',
      jobTitle: '',
      lastName: '',
      password: "",
      personalEmail: '',
      retries: 0,
      signature: null,
      status: true,
      type: "user",
      username: ''
    },
    defaultItem: {
      id:'',
      agentCode: null,
      approval: null,
      cellPhone: '',
      corporateEmail: null,
      document: '',
      esanUser: null,
      firstName: '',
      jobTitle: '',
      lastName: '',
      password: "",
      personalEmail: '',
      retries: 0,
      signature: null,
      status: true,
      type: "user",
      username: ''
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? ' Nuevo Usuario' : ' Editar Usuario'
    },

    icon (){
      return this.editedIndex === -1 ? 'mdi-account-plus' : 'mdi-account-edit'
    }
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
      this.getUsers()
    },

    async getUsers(){
      axios.get("/users/users", { headers: authHeader()
      }).then( (response) => {
        this.users = response.data._embedded.users;
      })
    },

    getEstado(status) {
      if (status === true ) return "green";
      else return "red";
    },

    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.users.splice(this.editedIndex, 1)
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
        axios.post("/users/users/"+this.editedItem.id, this.editedItem, {
          headers: authHeader()
        }).then(() => {
          this.$swal({
            title: "Edicion de Usuario",
            text: `El usuario fue editado Satisfactoriamente`,
            icon: "success",
            buttons: false
          }).then(() =>{this.close})
        })
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        axios.post("/users/users",this.editedItem, {
          headers: authHeader()
        }).then(() => {
          this.$swal({
            title: "Creacion de Usuario",
            text: `El usuario fue creado Satisfactoriamente`,
            icon: "success",
            buttons: false
          }).then(() =>{this.close})
        })
      }
    },
  },
}
</script>