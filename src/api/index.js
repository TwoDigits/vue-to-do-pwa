import axios from 'axios'

// TODO: Remove the cors-anywhere url on production
const API_URL = 'https://cors-anywhere.herokuapp.com/https://j6fo38azgk.execute-api.eu-central-1.amazonaws.com/dev'

const config = {
  baseURL: API_URL
}

export default {
  async fetchTodos () {
    let response = await axios.get('/tasks', config)
    return response.data
  },

  async updateTodo (todo) {
    return axios.put('/tasks/' + todo.id, todo, config)
  },

  async createTodo (todo) {
    let response = await axios.post('/tasks', todo, config)
    let locationHeader = response.headers['location']
    let pathSegments = locationHeader.split('/')
    return pathSegments[pathSegments.length - 1]
  },

  async deleteTodo (id) {
    return axios.delete('/tasks/' + id, config)
  }
}
