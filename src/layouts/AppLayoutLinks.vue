<template>
  <div class="menu">
    <v-app-bar app dense class="flex-grow-0" dark>
      <div class="d-flex">
        <router-link to="/">
          <v-img alt="PAES Logo"
                 class="shrink mr-2"
                 contain
                 src="@/assets/logo.png"
                 transition="scale-transition"
                 width="90"
          ></v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            icon
            v-bind="attrs"
            v-on="on"
          >
          <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title @click="closeSesion">Cerrar Sessión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app
                         v-model="drawer"
                         :mini-variant.sync="mini"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{username}}</v-list-item-title>
        <v-btn
            icon
            @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <router-link :to="item.path" >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </router-link>
          <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  name: "AppLayoutLinks",
  mounted() {
    let user = JSON.parse(localStorage.getItem("user"))
    this.username = `${user.name} ${user.lastname}`
  },
  data() {
    return {
      username:'',
      drawer: true,
      mini: true,
      items: [
        {title: 'Home', icon: 'mdi-home-city' , path:"/"},
      //  {title: 'Diseñador de Encuestas', icon: 'mdi-file-document-edit-outline', path:"/survey/designer"},
        {title: 'Encuestas', icon: 'mdi-text-box-check-outline', path:"/survey/surveys"},
      //  {title: 'Usuarios', icon: 'mdi-account', path:"/survey/users"},
      ],
    }
  },
  methods: {
    closeSesion(){
      localStorage.clear()
      this.$router.push("/login")
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
}

.menu {
  height: 48px;
}
</style>