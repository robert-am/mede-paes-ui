<template>
  <div class="flex-grow-0">
    <h2 class="pa-4">Encuestas Disponibles</h2>
    <SurveySelector></SurveySelector>
  </div>
</template>
<script>
import SurveySelector from "@/components/surveys/components/SurveySelector";
export default {
  name: "SurveyPage",
  components: {SurveySelector},
  methods: {

  }
}
</script>
<style>
.loginCard {
  opacity: 0.9;
  width: 80%;
}
</style>