<template>
  <div>
    <VueSignaturePad
        width="600px"
        height="300px"
        ref="signaturePad"
        class="sign"
    />
    <p>Utilice el cursor o el dedo para firmar en el recuadro</p>
    <v-row justify="center" class="mt-4 mb-4">
      <v-btn class="ma-2" depressed color="secundary" @click="undo"
      >Cancelar</v-btn
      >
      <v-btn
          class="ma-2"
          depressed
          color="secundary"
          @click="clearSignature"
      >Limpiar firma</v-btn
      >
    </v-row>
  </div>
</template>
<script>
export default {
  methods:{
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    clearSignature() {
      this.$refs.signaturePad.clearSignature();
    },
  }
}
</script>
<style>
.sign {
  border: 1px solid gray;
}
</style>