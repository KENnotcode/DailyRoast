// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
      }
});

module.exports = router;