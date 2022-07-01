<template>
  <div>
    <v-row dense>
      <v-col>
        <v-card class="mx-auto" color="#26c6da">
          <v-card-title>
            <v-icon>mdi-document</v-icon>
            Acta de Visita Supervisión General
          </v-card-title>
          <v-card-subtitle>
            {{
              "FO-GESR Acta de Visita de Supervisión General en Establecimiento Educativo – Seguridad Alimentaria" | truncate
            }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="showListActaSupervisionG">Ver Actas</v-btn>
            <v-btn @click="showListActaSupervisionG">Nueva Acta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" color="#26c6da">
          <v-card-title>
            Acta de Visita Supervisión En planta o Bodega
          </v-card-title>
          <v-card-subtitle>
            {{ "FO-GESR Acta de Visita de Supervisión en Planta O Bodega - Seguridad Alimentaria" | truncate }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="showListActaSupervisionP">Ver Actas</v-btn>
            <v-btn @click="showListActaSupervisionP">Nueva Acta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
    >
      <SurveyEdit></SurveyEdit>
    </v-dialog>
  </div>
</template>
<script>
import SurveyEdit from "@/components/surveys/components/SurveyEdit";
export default {
  name: "SurveyList",
  components: {SurveyEdit},
  filters: {
    truncate: function (value) {
      return value.substr(0, 60) + "..."
    }
  },
  data() {
    return {
      dialog: false,

    }
  },
  methods: {
    showListActaSupervisionG() {
      this.dialog = true
    },

    showListActaSupervisionP() {
      this.dialog = true
    }
  }
}
</script>