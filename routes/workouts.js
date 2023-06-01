const express = require('express');
const router = express.Router();

// Import Controllers
const workoutsCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /workouts
router.get('/', workoutsCtrl.index);

// Action: show -- Endpoint: GET /workouts/:id
router.get('/:id', workoutsCtrl.show);

// GET /workouts/new
// ? the ensureLoggedIn will call next provided the user is logged in, so that they can create a new workout
// ? adding these routes for later - also add update functionality -> PUT /workouts/:idß
// ! add same protection to exercises routes and comments (if I reach that)
router.get('/new', ensureLoggedIn, workoutsCtrl.new);

// GET /workouts/:id (show functionality)- Must be below new route
// router.get('/:id', workoutsCtrl.show);

// POST /workouts
router.post('/', ensureLoggedIn, workoutsCtrl.create);

module.exports = router;
