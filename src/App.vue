<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Your To-Do Lists
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click="true"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="`divider-${i}`"></v-divider>
      </v-list>
      <v-list-tile>
        <v-list-tile-action>
            <v-icon v-html="add"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Add a new todo list..</v-list-tile-title>
          </v-list-tile-content>
      </v-list-tile>
    </v-navigation-drawer>-->
    <v-toolbar app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="refresh" :disabled="refreshDisabled" icon>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => {
    return {
      // drawer: true,
      // items: [{
      //   icon: 'edit',
      //   title: 'To do'
      // }],
      title: 'TwoDigits+ - TODO',
      refreshDisabled: false
    }
  },

  methods: {
    async refresh () {
      this.refreshDisabled = true
      await this.$store.dispatch('fetchTodos')
      this.refreshDisabled = false
    }
  }
}
</script>
