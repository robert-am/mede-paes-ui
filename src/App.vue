<template>
  <v-app>
    <AppLayout>
      <router-view/>
    </AppLayout>
  </v-app>
</template>

<script>
import router from "./router"
import AppLayout from "@/layouts/AppLayout";

export default {
  name: 'App',
  router,
  components: {AppLayout},
};
</script>
<style>

</style>