<template>
  <v-form @submit.prevent="submit">
    <v-card>
      <v-toolbar
          dark
          color="primary"
      >
        <v-btn
            icon
            dark
            @click="close"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ survey.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
              dark
              text
              type="submit"
          >
            Guardar
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <div class="form-row" v-for="(question, index ) in questions" :key="index">
          <div v-if="question.type == 'title'">
            <div>
              <h2>{{ question.label }}</h2>
            </div>
          </div>
          <div v-if="question.type == 'subtitle'">
            <div>
              <h3>{{ question.label }}</h3>
            </div>
          </div>
          <div v-if="question.type == 'label'">
            <q-label :value=question.label></q-label>
          </div>
          <div v-if="question.type == 'text'">
            <v-text-field :label="question.label" v-model="question.answer"></v-text-field>
          </div>
          <div v-if="question.type == 'select'">
            <v-select
                v-model="question.answer"
                :label="question.label"
                :items="question.options"
            ></v-select>
          </div>
          <div v-if="question.type=='date'">
            <v-menu
                v-model="question.isEnable"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="question.dateFormatted"
                    :label="question.label"
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
                  v-model="question.answer"
                  @input="question.isEnable = false"
                  @change="question.dateFormatted = parseDate(question.answer)"
              ></v-date-picker>
            </v-menu>
          </div>
          <div v-if="question.type == 'textarea'">
            <v-textarea v-model="question.answer" :label="question.label"></v-textarea>
          </div>
          <div v-if="question.type == 'signature'">
            <span>{{ question.label }}</span>
            <vue-signature-pad :ref="question.name" width="600px" height="200px" :v-model="question.answer"></vue-signature-pad>
            <v-btn
                class="ma-2"
                depressed
                color="secundary"
                @click="clearSignature(question.name)">Limpiar firma</v-btn>
          </div>
          <div v-if="question.type == 'check'">
            <span>{{ question.label }}</span>
            <div v-for="(option, idx) in question.options " :key="idx">
              <v-checkbox
                  v-model="option.answer"
                  :label="option"
                  hide-details
              ></v-checkbox>
            </div>
          </div>
          <div v-if="question.type == 'multi-question'">
            <div>
              <v-row>
                <v-col>
                  <span>{{ question.label }}</span>
                </v-col>
                <v-col v-for="(innerQuestion, idx) in question.innerQuestions" :key="idx">
                  <span>{{ innerQuestion.label }}</span>
                  <v-radio-group v-model="innerQuestion.answer">
                    <v-radio v-for="(option, idx2) in question.options" :label="option" :value="option"
                             :key="idx2"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </div>
          </div>
          <div v-if="question.type == 'option'">
            <div>
              <v-row>
                <v-col md="10">
                  <span>{{ question.label }}</span>
                </v-col>
                <v-col>
                  <v-radio-group v-model="question.answer">
                    <v-radio v-for="(option, idx2) in question.options" :label="option" :value="option"
                             :key="idx2"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </div>
          </div>
          <div v-if="question.type == 'table'">
            <q-table
                :title="question.label"
                :headers="question.headers"
                :items="question.answers"
                :fields="question.fields"
            >
            </q-table>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-dialog>
    </v-dialog>
    <v-dialog>
    </v-dialog>
  </v-form>
</template>
<script>

import QLabel from "@/components/question/QLabel";
import QTable from "@/components/question/QTable";
import moment from 'moment'

export default {
  name: "SurveyEdit",
  props: {
    surveyName: String,
    survey: {},
    questions: [],
  },
  components: {QTable, QLabel},
  data: () => ({}),

  mounted() {
    console.log('mounted')
  },


  methods: {

    parseDate (date) {
      if(!date) return null
      return moment(date).format('DD-MM-YY')
    },

    clearSignature(controlName){
      console.log(controlName)
      this.$refs[controlName][0].clearSignature()
    },
    close() {
      this.$emit("close-survey")
    },
    submit(){
      this.$swal({
        title: "Encusta",
        text: `La encuesta ha sido guardada satisfactoriamente`,
        icon: "success",
        buttons: false
      }).then(() => {
        this.close()
      })
      //console.log(this.survey)
      //console.log(this.questions)
    }
  }
}
</script>
<style>


</style>