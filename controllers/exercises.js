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
    res.render('exercises/new', { title: 'Add Exercise', exercises})
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
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
    }
    res.redirect('/exercises/new')
}

// DELETE /workout/:id
async function deleteExercise(req, res, next) {
    try {
        const { id } = req.params
        const exercise = await Exercise.findById(id)

        // could be more concise, by using:
        // await Workout.deleteOne({ _id: id })

        // validating if user is the same as who created the exercise -> if not:
        // if (exercise.user.toString() !== req.user._id.toString()) {
        //     return res.render('workouts/unauthorized', { title: 'Error', message: 'You are not authorised to delete this exercise.' })
        // }
        // else, when user matches, delete workout and return to page they were on
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

module.exports = {
    index,
    new: newExercise,
    create,
    show,
    my: myExercises,
    delete: deleteExercise
}