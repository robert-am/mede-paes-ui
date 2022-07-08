<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-data-table
          dense
          headers=""
          items=""
      ></v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "SurveyList",
  components: {},
  props: {
    title: String,
    surveys: []
  },
  data: () => ({
    items: this.surveys.items,
    headers: [
      {
        text:"",
        value:"",
      }
    ]
  })
}
</script>