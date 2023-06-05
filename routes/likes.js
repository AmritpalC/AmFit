const express = require('express');
const router = express.Router();

// Import Controllers
const likesCtrl = require('../controllers/likes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /workouts/:id/likes -> like a workout
router.post('/workouts/:id/likes', ensureLoggedIn, likesCtrl.create);

module.exports = router;