const Exercise = require('../models/exercise');
const Workout = require('../models/workout');

async function index(req, res, next) {
    const allExercises = await Exercise.find({}).sort('name')
    console.log(allExercises)
    res.render('exercises/index', {
        title: 'Search Exercises',
        exercises: allExercises
    })
}

async function show(req, res, next) {
    try {
        const { id } = req.params
        const exercise = await Exercise.findById(id)
        res.render('exercises/show', {
            exercise,
            title: exercise.name
        })
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next()
    }
}

async function newExercise(req, res, next) {
    const exercises = await Exercise.find({}).sort('name');
    res.render('exercises/new', { title: 'Add Exercise', errorMessage: '', exercises})
}

async function create(req, res, next) {
    try {        
        const userId = req.user._id
        const userName = req.user.name
        const body = {
            ...req.body,
            user: userId,
            username: userName
        }
        const createdExercise = await Exercise.create(body)
        console.log(createdExercise)
        res.redirect('/exercises/new')
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        const exercises = await Exercise.find({}).sort('name')
        res.render('exercises/new', { title: 'Add Exercise', errorMessage: err.message, exercises })
    }
}

// DELETE /exercise/:id
async function deleteExercise(req, res, next) {
    try {
        const { id } = req.params
        const exercise = await Exercise.findById(id)

        // validating if user is the same as who created the exercise -> if not:
        if (exercise.user.toString() !== req.user._id.toString()) {
            return res.render('workouts/unauthorized', { title: 'Error', message: 'You are not authorised to delete this exercise.' })
        }
        // else, when user matches, delete exercise and return to page they were on
        await exercise.deleteOne()
        const referer = req.headers.referer
        if (referer && referer.includes('/exercises/my')) {
            res.redirect('/exercises/my')
        } else {
        res.redirect('/exercises')
        }
    } catch (err) {
        console.log('ERROR MESSAGE ->', { errorMessage: err.message })
        next()
    }
}

async function myExercises(req, res, next) {
    try {
        const userId = req.user._id
        const exercises = await Exercise.find({ user: userId })
        console.log(exercises)
        console.log(req.user)
        res.render('exercises/my', { title: 'My Exercises', exercises })
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next()
    }
}

async function addToWorkout(req, res) {
    const workout = await Workout.findById(req.params.id)
    // exercises array holds the exercise's ObjectId (referenced)
    workout.exercises.push(req.body.exerciseId)
    await workout.save()
    res.redirect(`/workouts/${workout._id}`);
}

module.exports = {
    index,
    new: newExercise,
    create,
    show,
    my: myExercises,
    delete: deleteExercise,
    addToWorkout
}