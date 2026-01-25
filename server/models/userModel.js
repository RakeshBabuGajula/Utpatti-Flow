const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            default: 'Developer', // e.g., Developer, Manager, Designer
        },
        avatar: {
            type: String, // URL to avatar image or initial
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
