const express = require('express');
const router = express.Router();

// Import Controllers
const exercisesCtrl = require('../controllers/exercises');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /workouts
router.get('/exercises', exercisesCtrl.index);

// GET /exercises/new (New)
router.get('/exercises/new', ensureLoggedIn, exercisesCtrl.new);

// GET /exercises/:id (show functionality)- Must be below new route
router.get('/exercises/:id', ensureLoggedIn, exercisesCtrl.show);

// GET /exercises/my -> show logged in user's exercises
router.get('/exercises/my', ensureLoggedIn, exercisesCtrl.my)

// POST /exercises (Create)
router.post('/exercises', ensureLoggedIn, exercisesCtrl.create);

// DELETE /workouts/:id
router.delete('/exercises/:id', ensureLoggedIn, exercisesCtrl.delete)

// POST /workouts/:id/exercises (associate exercises with a workout)
router.post('/workouts/:id/exercises', ensureLoggedIn, exercisesCtrl.addToWorkout)

module.exports = router;