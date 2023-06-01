const express = require('express');
const router = express.Router();

// Import Controllers
const workoutsCtrl = require('../controllers/workouts');

// GET /workouts
router.get('/', workoutsCtrl.index);
// GET /workouts/new

// GET /workouts/:id (show functionality)- Must be below new route

// POST /workouts

module.exports = router;
