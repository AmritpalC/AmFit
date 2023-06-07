const express = require('express');
const router = express.Router();

// Import Controllers
const workoutsCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /workouts
router.get('/', workoutsCtrl.index);

// GET /workouts/new
// ? the ensureLoggedIn will call next provided the user is logged in, so that they can create a new workout
// ! add same protection to exercises routes and comments (if I reach that)
router.get('/new', ensureLoggedIn, workoutsCtrl.new);

// GET /workouts/:id (show functionality)- Must be below new route
router.get('/:id', workoutsCtrl.show);

// GET /workouts/my -> show logged in user's workouts
router.get('/my', ensureLoggedIn, workoutsCtrl.my)

// GET /workouts/unauthorized -> error if not allowed to delete a workout
router.get('/unauthorized', ensureLoggedIn, workoutsCtrl.unauthorized)

// POST /workouts
router.post('/', ensureLoggedIn, workoutsCtrl.create);

// GET /workouts/:id/edit
router.get('/:id/edit', ensureLoggedIn, workoutsCtrl.edit);

// PUT /workouts/:id -> update action
router.put('/:id', ensureLoggedIn, workoutsCtrl.update)

// DELETE /workouts/:id
router.delete('/:id', ensureLoggedIn, workoutsCtrl.delete)

module.exports = router;

// // GET /workouts/:id/delete
// router.get('/:id', ensureLoggedIn, workoutsCtrl.confirmDeleteWorkout)