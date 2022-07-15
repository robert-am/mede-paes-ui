<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
            dense
            :headers="qHeaders"
            :items="qItems"
            hide-default-footer
            :items-per-page="50"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical>
              </v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                  v-model="dialog"
                  max-width="800px"
              >
                <!--
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    Nuevo Item
                  </v-btn>
                </template>
                 -->
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{title}}</span>
                  </v-card-title>
                  <v-card-text>
                      <v-row>

                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            v-for="(field, idx) in qFields" :key="idx"
                        >
                          <v-checkbox
                              v-model="$data['editedItem'][field.name]"
                              :label="field.label"
                              hide-details
                          >

                          </v-checkbox>
                          <!--
                          <v-text-field
                              :label="field.label"
                              v-model="$data['editedItem'][field.name]"
                          ></v-text-field>
                          -->
                        </v-col>
                      </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
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
                      Agregar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <!--
            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
            -->
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    headers: [],
    items: [],
    fields:[]
  },
  data() {
    return {
      qtitle: this.title,
      dialog: false,
      qHeaders: this.headers,
      qFields: this.fields,
      editedIndex: -1,
      editedItem: {
      },
      defaultItem:{},
      qItems: this.items

    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize(){
      this.fields.forEach(field => {
        this.editedItem[field.name] = ""
        this.defaultItem[field.name] = ""
      })
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem(item){
      this.editedIndex = this.qItems.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.qItems[this.editedIndex], this.editedItem)
      } else {
        this.qItems.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>
<style>

</style>