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
    my: myExercises
}