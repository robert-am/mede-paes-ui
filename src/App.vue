<template>
  <v-app>
   <router-view></router-view>
  </v-app>
</template>

<script>
import router from "./router"

export default {
  name: 'App',
  router,
  components: {},
};
</script>
