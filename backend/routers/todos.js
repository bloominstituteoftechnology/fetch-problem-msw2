const express = require('express')
const Todo = require('../helpers')

const router = express.Router()

router.get('/', (req, res) => {
  res.json(Todo.getAll())
})

router.patch('/:id', (req, res) => {
  res.json(Todo.toggleDone(req.params.id))
})

module.exports = router
