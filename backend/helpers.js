let todos
let id = 1
let getId = () => id++

const resetTodos = () => {
  id = 1
  todos = [
    { id: getId(), name: 'laundry', complete: false },
    { id: getId(), name: 'dishes', complete: false },
    { id: getId(), name: 'groceries', complete: false },
  ]
}

resetTodos()

const getAll = () => {
  return todos
}

const toggleDone = id => {
  todos = todos.map(todo => {
    return todo.id == id
      ? { ...todo, complete: !todo.complete }
      : todo
  })
  return todos
}

module.exports = {
  getAll,
  toggleDone,
  resetTodos,
}
