const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const boardRoutes = require('./board');

router.use('/auth', authRoutes)
router.use('/boards', boardRoutes);

module.exports = router;
