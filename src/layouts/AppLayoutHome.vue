<template>
  <div>
    <header class="header"></header>
    <AppLayoutsLinks></AppLayoutsLinks>
    <div class="container">
      <slot/>
    </div>
  </div>
</template>
<script>
import AppLayoutsLinks from "@/layouts/AppLayoutLinks";
export default {
  name: "AppLayoutHome",
  components: {
    AppLayoutsLinks
  }
}
</script>
<style>
.container{
  margin-left: 60px;
}
</style>