<template>
<div>
  <v-text-field :label="qLabel" :value="qContent" @input="handleInput"></v-text-field>
</div>
</template>
<script>
export default {
  name:"QText",
  props: [
      'label',
      'modelValue'
  ],
  emits: [
    'update:modelValue'
  ],
  data() {
    return {
      qLabel: this.label,
      qContent: this.value
    }
  },
  methods:{
    handleInput(e){
      console.log(e)
      this.qContent = e
      this.$emit('update:modelValue', e)
    }
  }
}
</script>
<style>

</style>