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
      <v-btn icon><v-icon>mdi-account</v-icon> </v-btn>
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
  data() {
    return {
      username:'',
      drawer: true,
      mini: true,
      items: [
        {title: 'Home', icon: 'mdi-home-city' , path:"/"},
      //  {title: 'Diseñador de Encuestas', icon: 'mdi-file-document-edit-outline', path:"/survey/designer"},
        {title: 'Encuestas', icon: 'mdi-text-box-check-outline', path:"/survey/surveys"},
        {title: 'Usuarios', icon: 'mdi-account', path:"/survey/users"},
      ],
    }
  },
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