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
      <v-toolbar-title>{{ title }}</v-toolbar-title>
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
        <div v-if="question.type == 'signature'" >
          <span>{{question.label}}</span>
          <vue-signature-pad width="400px" height="200px" :v-model="question.answer"></vue-signature-pad>
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
  .signature{
    border: 1px solid black;
  }
</style>