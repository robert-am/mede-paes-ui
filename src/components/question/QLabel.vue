<template>
  <div style="text-align: center">
    <h4>{{ content }}</h4>
  </div>
</template>
<script>
export default {
  props:{
    value: String
  },
  data() {
    return {
      content: this.value
    }
  },
}
</script>