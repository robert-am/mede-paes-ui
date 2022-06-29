<template>
  <component :is ="layout">
    <slot></slot>
  </component>
</template>

<script>
  const defautlLayout = 'AppLayoutDefault'

  export default{
    name:"AppLayout",
    computed: {
      layout(){
        const layout = this.$route.meta.layout || defautlLayout
        return () => import(`/layouts/${layout}.vue`)
      }
    }
  }
</script>