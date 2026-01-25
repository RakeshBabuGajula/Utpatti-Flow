const mongoose = require('mongoose');

const taskHistorySchema = mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: true,
        },
        fromPhase: {
            type: String,
            required: true,
        },
        toPhase: {
            type: String,
            required: true,
        },
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true,
        },
        comment: {
            type: String,
        },
    },
    {
        timestamps: true, // This will provide the timestamp of the change
    }
);

module.exports = mongoose.model('TaskHistory', taskHistorySchema);
