// Importing model
const Workout = require('../models/workout')

// GET /workouts
async function index(req, res, next) {
    // want to query workouts collection and return all workouts, 
    // passing them into the render template
    const allWorkouts = await Workout.find({})
    console.log(allWorkouts)
    res.render('workouts/index', {
        title: 'Search Workouts',
        workouts: allWorkouts
    })
}

// Get /workouts/:id
async function show(req, res, next) {
    try {
        const { id } = req.params
        const workout = await Workout.findById(id)
        res.render('workouts/show', {
            workout,
            title: workout.name
        })
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
    }
}

module.exports = {
    index,
    show
}