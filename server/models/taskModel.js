const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            enum: ['Backlog', 'Design', 'Development', 'Testing', 'Deployment', 'Done'],
            default: 'Backlog',
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            default: 'Medium',
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true, // Optional for simplicity in this demo
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);
