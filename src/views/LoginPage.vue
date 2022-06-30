<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card elevation="12" class="loginCard">
          <v-toolbar dark>
            <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  prepend-icon="mdi-account"
                  name="usuario"
                  label="Usuario"
                  type="text"
              ></v-text-field>
              <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="passwors"
                  type="password"
                  label="Password"></v-text-field>
              <router-link to="/reset">¿Olvidaste tu contraseña?</router-link>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" >Iniciar Sesion</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "LoginPage",
  components: {},
  methods: {
    login(){
      console.log("Todo: Implement Service Login")
    }
  }
}
</script>
<style>
  .loginCard {
    opacity: 0.9;
    width: 80%;
  }
</style>