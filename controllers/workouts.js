// Importing model
const Workout = require('../models/workout')

// GET /workouts

async function index(req, res, next) {
    // want to query workouts collection and return all workouts, 
    // passing them into the render template
    const allWorkouts = await Workout.find({})
    console.log(allWorkouts)
    res.render('workouts/index',
    {
        title: 'Search Workouts',
        workouts: allWorkouts
    })
}

module.exports = {
    index
}