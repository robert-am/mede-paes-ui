<template>
  <div class="menu">
    <v-app-bar app color="blue ligthen-5">
      <v-app-bar-nav-icon @click.stop = "drawer =!drawer"></v-app-bar-nav-icon>
      <router-link to="/paes/home">
        <v-img alt="PAES Logo"
               class="shrink mr-2"
               contain
               src="@/assets/logo.png"
               transition="scale-transition"
               width="80"
        ></v-img>
      </router-link>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "AppLayoutLinks"
}
</script>
<style scoped>

</style>