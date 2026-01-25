const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password'); // No password for now, but good practice
    res.status(200).json(users);
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, role, avatar } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error('Please include all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        role: role || 'Developer',
        avatar,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public (for now)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Use findByIdAndDelete or user.remove() depending on mongoose version. 
        // user.remove() is deprecated in newer mongoose, findByIdAndDelete is safer.
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ id: req.params.id, message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Public (for now)
const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = req.body.role || user.role;
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    getUsers,
    registerUser,
    deleteUser,
    updateUserRole
};
