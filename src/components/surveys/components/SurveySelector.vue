<template>
  <div>
    <v-row dense>
      <v-col v-for="(survey, idx) in surveys" :key="idx">
        <v-card class="mx-auto" color="#26c6da">
          <v-card-title>
            <v-icon>mdi-document</v-icon>
            {{ survey.title }}
          </v-card-title>
          <v-card-subtitle>
            {{
              survey.name | truncate
            }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="showListOfSurveys">Ver Actas</v-btn>
            <v-btn @click="newSurvey(survey)">Nueva Acta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog"
        fullscreen
        scrollable
        transition="dialog-bottom-transition"
    >
      <SurveyEdit :survey="survey" :questions="questions" :survey-name="surveyName" v-on:close-survey="closeSurvey"></SurveyEdit>
    </v-dialog>
  </div>
</template>
<script>
import SurveyEdit from "@/components/surveys/components/SurveyEdit";

export default {
  name: "SurveySelector",
  components: {SurveyEdit},
  filters: {
    truncate: function (value) {
      return value.substr(0, 60) + "..."
    }
  },
  data() {
    return {
      dialog: false,
      surveyType: '',
      surveyName:'',
      survey: {},
      questions:[],
      surveys: [
        {
          title: "Acta de Visita Supervisión General",
          code: "",
          name: "FO-GESR Acta de Visita de Supervisión General en Establecimiento Educativo – Seguridad Alimentaria",
          description: "",
          file: "survey-vsgenee.json"
        },
        {
          title: "Acta de Visita Supervisión General",
          code: "",
          name: "FO-GESR Acta de Visita de Supervisión en Planta O Bodega - Seguridad Alimentaria",
          description: "",
          file: "survey-avsplanta.json"
        },
        {
          code: "",
          name: "",
          description: "",
          file: "survey-avsplanta.json"
        }
      ]
    }
  },
  methods: {
    showListOfSurveys() {
      this.dialog = true
    },

    newSurvey(survey) {
      import(`@/static/${survey.file}`).then(surveyResult => {
        this.survey = surveyResult;
        this.questions = surveyResult.questions
        this.surveyName = survey.name
      })
      this.dialog = true
    },
    closeSurvey(){
      this.dialog=false
      this.surveyType = ''
    }
  }
}
</script>