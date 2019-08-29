import axios from 'axios'

// TODO: Remove the cors-anywhere url on production
const API_URL = 'https://j6fo38azgk.execute-api.eu-central-1.amazonaws.com/dev'

const config = {
  baseURL: API_URL
}

export default {
  async fetchTodos () {
    let response = await axios.get('/dev/tasks', config)
    return response.data
  },

  async updateTodo (todo) {
    return axios.put('/dev/tasks/' + todo.id, todo, config)
  },

  async createTodo (todo) {
    let response = await axios.post('/dev/tasks', todo, config)
    let locationHeader = response.headers['location']
    let pathSegments = locationHeader.split('/')
    return pathSegments[pathSegments.length - 1]
  },

  async deleteTodo (id) {
    return axios.delete('/dev/tasks/' + id, config)
  }
}
