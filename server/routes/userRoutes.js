const express = require('express');
const router = express.Router();
const { getUsers, registerUser, deleteUser, updateUserRole } = require('../controllers/userController');

router.route('/').get(getUsers).post(registerUser);
router.route('/:id').delete(deleteUser);
router.route('/:id/role').put(updateUserRole);

module.exports = router;
