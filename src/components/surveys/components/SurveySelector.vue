<template>
  <div>
    <v-row dense>
      <v-col v-for="(survey, idx) in surveys" :key="idx" md="4">
        <v-card color="#26c6da">
          <v-card-title>
            <v-icon>mdi-document</v-icon>
            {{ survey.code }} {{ survey.title }}
          </v-card-title>
          <v-card-subtitle>
            {{
              survey.description
            }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="showListOfSurveys(survey)">Ver Actas</v-btn>
            <v-btn @click="newSurvey(survey)">Nueva Acta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog"
        fullscreen
        scrollable
        persistent
        transition="dialog-bottom-transition"
    >
      <SurveyEdit :survey="survey" :questions="questions" :survey-name="surveyName"
                  v-on:close-survey="closeSurvey"></SurveyEdit>
    </v-dialog>
    <v-dialog
        v-model="dialogTable"
        scrollable
        persistent
        fullscreen
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="closeDlgTable"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ surveyName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
              dark
              text
              @click="search"
          >
            Buscar
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <!--
          <v-form>
            <v-row>
              <v-col md="4">
                <v-text-field label="Fecha"></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field label="Interventor"></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field label="Establecimiento Edicativo"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4">
                <v-text-field label="Lote"></v-text-field>
              </v-col>
              <v-col md="4">
                <v-text-field label="Tipo Operador"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          -->
          <v-data-table
              :headers="surveyHeaders"
              :items="surveyList"
          >
            <template v-slot:[`item.actions`]="{item}">
              <v-icon
                  small
                  class="mr-2"
                  @click="editSurvey(item)"
              >mdi-pencil
              </v-icon>
              <v-icon
                  small
                  class="mr-2"
                  @click="showPdf(item)"
              >mdi-file-pdf-box
              </v-icon>
            </template>
          </v-data-table>

        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SurveyEdit from "@/components/surveys/components/SurveyEdit";
import axios from "axios";
import authHeader from "@/middlewares/authHeaders";

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
      surveyHeaders: [
        {
          "text": "Contratista",
          "value": "contratista",
        },
        {
          "text": "Establecimiento",
          "value": "establecimiento.sede",
        },
        {
          "text": "Fecha",
          "value": "fechaVisita"
        },
        {
          "text": "Interventor",
          "value": "interventor"

        },
        {
          "text": "Nro de Visita",
          "value": "visita"

        },
        {
          "text": "Tipo de Complemento",
          "value": "complementos"
        },
        {
          "text": "Actions",
          "value": "actions",
          "sortable": false
        }
      ],
      surveyList: [],
      dialog: false,
      dialogTable: false,
      surveyType: '',
      surveyName: '',
      survey: {},
      questions: [],
      surveys: [
        {
          title: "Acta de Visita de Supervisión General en Establecimiento Educativo",
          code: "1653",
          description: "FO-GESR Acta de Visita de Supervisión General en Establecimiento Educativo – Seguridad Alimentaria",
          file: "survey-vsgenee.json"
        },
        {
          title: "Acta de Visita de Supervisión en Planta O Bodega",
          code: "1654",
          description: "FO-GESR Acta de Visita de Supervisión en Planta O Bodega - Seguridad Alimentaria",
          file: "survey-avsplanta.json"
        },
        {
          title: "Acta de Visita de Supervisión General en Establecimiento Educativo",
          code: "1655",
          description: "FO-GESR Acta de Visita de Mantenimiento",
          file: "survey-vsgenee1.json"
        }
      ]
    }
  },
  methods: {
    showListOfSurveys(survey) {
      this.surveyName = `Busqueda de ${survey.code} ${survey.title}`
      let user = JSON.parse(localStorage.getItem("user"))
      axios.get(`/survey/survey-user/${survey.code}/${user.id}`, {
        headers: authHeader()
      }).then(result => {
        let data = []
        let row = {}
        result.data.forEach(survey => {
          this.questions = survey.questions
          this.questions.forEach(q => {
            if ("viewlist" in q) {
              console.log(q)
              row[q.name] = q.answer
            }
          })
          console.log(row)
          data.push(row)
          this.surveyList = data
        })
      })
      this.dialogTable = true
    },

    editSurvey() {
      console.log("edit")
    },

    async newSurvey(survey) {
      let locaUser = JSON.parse(localStorage.getItem("user"))
      let user = await this.loadUserData(locaUser.id)
      console.log(user)
      import(`@/static/${survey.file}`).then(surveyResult => {
        this.survey = surveyResult;
        this.questions = surveyResult.questions
        this.questions.forEach(q => {
          if ("autofill" in q) {
            console.log(q)
            q.answer = user[q.autofill]
          }
        })
        this.surveyName = survey.name
        this.dialog = true
      })
    },

    async loadUserData(id) {
      let data = await axios.get(`/users/users/${id}`, {
        headers: authHeader()
      }).then((response) => {
        return response.data;
      })
      data["fullname"] = `${data.firstName} ${data.lastName}`
      return data
    },

    closeDlgTable() {
      this.dialogTable = false
      this.$router.go()
    },

    closeSurvey() {
      console.log("Close")
      this.dialog = false
      this.$router.go()
    },
    search() {

    },
    showPdf(survey) {
      console.log(survey)
    }
  }
}
</script>
<style>
.v-toolbar {
  flex: none;
}
</style>