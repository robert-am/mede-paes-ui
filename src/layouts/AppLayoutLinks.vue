<template>
  <div class="menu">
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant.sync="mini"
        absolute
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn
            icon
            @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dense dark>
      <v-app-bar-nav-icon @click.stop = "mini =!mini"></v-app-bar-nav-icon>
      <router-link to="/paes/home">
        <v-img alt="PAES Logo"
               class="shrink mr-2"
               contain
               src="@/assets/logo.png"
               transition="scale-transition"
               width="40"
        ></v-img>
      </router-link>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "AppLayoutLinks",
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' },
      ],
      mini: true,
    }
  },
}
</script>
<style scoped>

</style>