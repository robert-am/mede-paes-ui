<template>
  <div class="flex-grow-0">
    <h2 class="pa-4">Encuestas Disponibles</h2>
    <SurveyList></SurveyList>
  </div>
</template>
<script>
import SurveyList from "@/components/surveys/components/SurveyList";
export default {
  name: "SurveyPage",
  components: {SurveyList},
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