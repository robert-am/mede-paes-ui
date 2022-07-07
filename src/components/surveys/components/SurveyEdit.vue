<template>
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
      <v-toolbar-title>{{ survey.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
            dark
            text
            @click="dialog = false"
        >
          Guardar
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <div class="form-row" v-for="(question, index ) in questions" :key="index">
        <div v-if="question.type == 'label'">
          <div>
            <h2>{{ question.label }}</h2>
          </div>
        </div>
        <div v-if="question.type == 'text'">
          <v-text-field :label="question.label" v-model="question.answer"></v-text-field>
        </div>
        <div v-if="question.type == 'option'">
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
                  v-model="question.answer"
                  :label="question.label"
                  readonly
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="question.answer"
                @input="question.isEnable = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div v-if="question.type == 'textarea'">
          <v-textarea v-model="question.answer" :label="question.label"></v-textarea>
        </div>
        <div v-if="question.type == 'signature'">
          <span>{{ question.label }}</span>
          <vue-signature-pad width="400px" height="200px" :v-model="question.answer"></vue-signature-pad>
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
              <v-col >
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
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import survey from '@/static/survey-ogen.json';

export default {
  name: "SurveyEdit",
  props: {},
  components: {},
  data: () => ({
    title: "Acta de Visita Supervisión General",
    survey: survey,
    questions: survey.questions,
    /*questions: [
      {
        id: 1,
        type: 'text',
        order: 1,
        label: 'Contratista',
        options: [],
        answer: ''
      },
      {
        id: 1,
        type: 'option',
        order: 1,
        label: 'CONCEPTO DE SECRETARÍA DE SALUD - R.P.S.',
        options: [
            'No Tiene',
            'Favorable',
            'Condicionado'
        ],
        answer: ''
      }
    ]*/
  }),
  methods: {}
}
</script>
<style>
.signature {
  border: 1px solid black;
}
</style>