const express = require('express');
const router = express.Router();
const tasks = require('../controllers/tasks');

router
  .get('/', tasks.index)
  .get('/:id', tasks.show)
  .post('/', tasks.create)
  .put('/:id', tasks.update)
  .delete('/:id', tasks.destroy)

module.exports = router;