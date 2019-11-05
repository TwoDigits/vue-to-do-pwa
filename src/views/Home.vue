<template>
  <v-container>
    <v-text-field outline clearable v-model="todo" label="Add Todo..." @keydown.enter="create">
      <v-fade-transition slot="append">
        <v-progress-circular v-if="loading" color="info" size="24" indeterminate></v-progress-circular>
      </v-fade-transition>
      <v-fade-transition slot="append">
        <v-icon v-if="todo" @click="create">add_circle</v-icon>
      </v-fade-transition>
    </v-text-field>

    <v-divider class="mt-3"></v-divider>

    <v-layout my-1 align-center>
      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
      <v-spacer></v-spacer>
      <strong v-if="filterRemainingActive" @click="filterRemaining" class="mx-3 info--text text--darken-3">Remaining: {{ remainingTodos }}</strong>
      <div v-if="!filterRemainingActive" @click="filterRemaining" class="mx-3 info--text text--darken-3">Remaining: {{ remainingTodos }}</div>
      <v-divider vertical></v-divider>
      <strong v-if="filterCompletedActive" @click="filterCompleted" class="mx-3 green--text">Completed: {{ completedTodos }}</strong>
      <div v-if="!filterCompletedActive" @click="filterCompleted" class="mx-3 green--text">Completed: {{ completedTodos }}</div>
    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="todos.length > 0">
      <template v-for="(todo, i) in todos">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

        <v-list-tile :key="`${i}`">
          <v-list-tile-action>
            <v-checkbox v-model="todo.done" @change="updateTodo(todo)" color="info darken-3"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-edit-dialog
              class="text-xs-right"
              @save="updateTodo(todo)"
              :return-value.sync="todo.title"
              large
              lazy
            >
              <div
                :class="todo.done && 'gray--text' && 'is-selected' || 'text--primary'"
                class="text-xs-right"
              >{{ todo.title }}</div>
              <div slot="input" class="mt-3 title">Update TODO</div>
              <v-text-field
                slot="input"
                label="Title"
                v-model="todo.title"
                :rules="[rules.required]"
                single-line
              ></v-text-field>
              <v-text-field
                slot="input"
                label="Description"
                v-model="todo.description"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-scroll-x-transition>
            <v-icon v-if="todo.done" color="success">check</v-icon>
          </v-scroll-x-transition>
          <v-icon @click="deleteTodo(todo.id)" color="red">delete</v-icon>
        </v-list-tile>
      </template>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data: () => ({
    rules: {
      required: value => !!value || 'Required.'
    },
    loading: false,
    filterCompletedActive: false,
    filterRemainingActive: false,
    todo: null
  }),
  async created () {
    await this.$store.dispatch('fetchTodos')
  },
  components: {},
  computed: {
    todos () {
      if (this.filterCompletedActive) return this.$store.state.todos.filter(todo => { return todo.done })
      if (this.filterRemainingActive) return this.$store.state.todos.filter(todo => { return !todo.done })
      return this.$store.state.todos
    },
    completedTodos () {
      return this.$store.state.todos.filter(todo => todo.done).length
    },
    progress () {
      return (this.completedTodos / this.$store.state.todos.length) * 100
    },
    remainingTodos () {
      return this.$store.state.todos.length - this.completedTodos
    }
  },
  methods: {
    async create () {
      this.loading = true
      let todo = {
        done: false,
        title: this.todo
      }
      await this.$store.dispatch('createTodo', todo)
      this.todo = null
      this.loading = false
    },
    async updateTodo (todo) {
      delete todo._title
      if (!todo.title || todo.title === '') {
        return
      }
      await this.$store.dispatch('updateTodo', todo)
    },
    async deleteTodo (id) {
      await this.$store.dispatch('deleteTodo', id)
    },
    async filterCompleted () {
      this.filterCompletedActive = !this.filterCompletedActive
      this.filterRemainingActive = false
    },
    async filterRemaining () {
      this.filterRemainingActive = !this.filterRemainingActive
      this.filterCompletedActive = false
    }
  }
}
</script>

<style scoped>
.is-selected {
  text-decoration: line-through;
}
</style>
