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
                  fullscreen
                  persistent
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
                          <div v-if="field.type == 'text'">
                            <v-text-field :label="field.label" v-model="$data['editedItem'][field.name]" :readonly="field.readonly"></v-text-field>
                          </div>
                          <div v-if="field.type == 'select'">
                            <v-select
                                v-model="question.answer"
                                :label="question.label"
                                :items="question.options"
                            ></v-select>
                          </div>
                          <div v-if="field.type=='date'">
                            <v-menu
                                v-model="field.isEnable"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="field.dateFormatted"
                                    :label="field.label"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    hint="DD-MM-YY"
                                    persistent-hint
                                    prepend-icon="mdi-calendar"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  no-title
                                  v-model="$data['editedItem'][field.name]"
                                  @input="field.isEnable = false"
                                  @change="field.dateFormatted = parseDate($data['editedItem'][field.name])"
                              ></v-date-picker>
                            </v-menu>
                          </div>
                          <div v-if="field.type == 'check'">
                            <span>{{ field.label }}</span>
                            <div>
                              <v-checkbox
                                  v-for="(option, idx) in field.options" :key="idx"
                                  v-model="$data['editedItem'][field.name]"
                                  :label="option.label"
                                  :value="option.value"
                                  hide-details
                                  multiple
                              ></v-checkbox>
                              <br/>
                            </div>
                          </div>
                          <div v-if="field.type == 'option'">
                            <div>
                              <v-row>
                                <v-col md="10">
                                  <span>{{ field.label }}</span>
                                </v-col>
                                <v-col>
                                  <v-radio-group v-model="$data['editedItem'][field.name]">
                                    <v-radio v-for="(option, idx2) in field.options" :label="option" :value="option"
                                             :key="idx2"></v-radio>
                                  </v-radio-group>
                                </v-col>
                              </v-row>
                            </div>
                          </div>
                          <div v-if="field.type == 'numeric'">
                            <v-numeric
                                text
                                locale="en-US"
                                :precision="field.precision"
                                :label="field.label"
                                v-model="$data['editedItem'][field.name]"
                            ></v-numeric>
                          </div>
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
import moment from "moment";

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

    parseDate(date) {
      if (!date) return null
      return moment(date).format('DD-MM-YY')
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