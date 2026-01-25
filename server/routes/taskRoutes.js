const express = require('express');
const router = express.Router();
const { getTasks, createTask, moveTask, deleteTask, getTaskHistory } = require('../controllers/taskController');

router.route('/').get(getTasks).post(createTask);
router.route('/:id').delete(deleteTask);
router.route('/:id/move').put(moveTask);
router.route('/:id/history').get(getTaskHistory);

module.exports = router;
