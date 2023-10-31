const Todo = require('./helpers')
const { setupServer } = require('msw/node')
const { http, HttpResponse } = require('msw')

function getAll() {
  return HttpResponse.json(Todo.getAll())
}

function toggleDone({ params }) {
  return HttpResponse.json(Todo.toggleDone(params.id))
}

const handlers = [
  http.get('http://localhost:9009/api/todos', getAll),
  http.patch('http://localhost:9009/api/todos/:id', toggleDone),
]

module.exports = setupServer(...handlers)
