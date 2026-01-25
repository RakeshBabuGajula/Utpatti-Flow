const asyncHandler = require('express-async-handler');
const Task = require('../models/taskModel');
const TaskHistory = require('../models/taskHistoryModel');
const User = require('../models/userModel');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate('assignedTo', 'name avatar').sort({ createdAt: -1 });
    res.status(200).json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = asyncHandler(async (req, res) => {
    const { title, description, priority, assignedTo, status } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a task title');
    }

    const task = await Task.create({
        title,
        description,
        priority,
        assignedTo,
        status: status || 'Backlog',
    });

    // Initial history log
    await TaskHistory.create({
        taskId: task._id,
        fromPhase: 'Created',
        toPhase: task.status,
        changedBy: assignedTo, // Assuming creator is also assignee for simplicity or null
        comment: 'Task created',
    });

    res.status(201).json(task);
});

// @desc    Update task status (Move phase)
// @route   PUT /api/tasks/:id/move
// @access  Public
const moveTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    const { status, userId } = req.body; // userId of who moved it

    if (task.status === status) {
        return res.status(200).json(task); // No change
    }

    const oldStatus = task.status;
    task.status = status;
    await task.save();

    // Log history
    await TaskHistory.create({
        taskId: task._id,
        fromPhase: oldStatus,
        toPhase: status,
        changedBy: userId,
        comment: `Moved from ${oldStatus} to ${status}`,
    });

    // Return updated task with population to ensure UI stays consistent
    const updatedTask = await Task.findById(req.params.id).populate('assignedTo', 'name avatar');

    res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    await task.deleteOne();

    // Also delete history? Maybe keep it for audit. Let's keep it.

    res.status(200).json({ id: req.params.id });
});

// @desc    Get task history
// @route   GET /api/tasks/:id/history
// @access  Public
const getTaskHistory = asyncHandler(async (req, res) => {
    const history = await TaskHistory.find({ taskId: req.params.id })
        .populate('changedBy', 'name')
        .sort({ createdAt: -1 });

    res.status(200).json(history);
});

module.exports = {
    getTasks,
    createTask,
    moveTask,
    deleteTask,
    getTaskHistory
};
