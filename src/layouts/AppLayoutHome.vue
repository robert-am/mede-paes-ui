<template>
  <div>
    <header class="header"></header>
    <AppLayoutsLinks></AppLayoutsLinks>
    <div class="wrap">
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
body{
  font-family: Arial, Helvetica, sans-serif;
}
.wrap{
  margin: 20px 20px 20px 70px;
}

</style>