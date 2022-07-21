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
                  v-model="username"
              ></v-text-field>
              <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="passwors"
                  type="password"
                  label="Password"
                  v-model="password"
              ></v-text-field>
              <router-link to="/reset">¿Olvidaste tu contraseña?</router-link>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Iniciar Sesion</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>

import axios from "axios";

export default {
  name: "LoginPage",
  components: {},
  data: () => ({
    username: "",
    password: ""
  }),
  computed: {},
  mounted() {
    console.log(process.env.VUE_APP_API)
  },
  methods: {
    login() {
      const user = new FormData()
      user.append("username", this.username);
      user.append("password", this.password);
      user.append("grant_type", "password");
      axios.post('security/oauth/token',
          user,
          {
            headers: {
              'Authorization': `Basic ` + process.env.VUE_APP_KEY
            }
          }
      ).then(response => {
        console.log(response)
        localStorage.setItem("user", JSON.stringify(response.data))
        this.$router.push("/")
      }).catch(err => {
        console.log("Error: " + err)
      })
    },
  }
}
</script>
<style>
.loginCard {
  opacity: 0.9;
  width: 80%;
}
</style>