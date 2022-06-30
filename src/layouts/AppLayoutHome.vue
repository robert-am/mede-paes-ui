<template>
  <div>
    <header class="header"></header>
    <AppLayoutsLinks></AppLayoutsLinks>
    <slot/>
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

</style>