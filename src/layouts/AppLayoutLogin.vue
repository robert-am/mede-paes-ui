<template>
  <div class="login">
    <v-app-bar app dark dense>
      <router-link to="/">
        <v-img alt="PAES Logo"
               class="shrink mr-2"
               contain
               src="@/assets/logo.png"
               transition="scale-transition"
               width="30"
        ></v-img>
      </router-link>
    </v-app-bar>
    <slot/>
  </div>
</template>
<script>export default {
  name: "AppLayoutLogin",
  components: {}
}
</script>
<style scoped>
  .login {
    height: 100%;
    background: url("https://picsum.photos/1920/1080");
    overflow: hidden;
  }
</style>