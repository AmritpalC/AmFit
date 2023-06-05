// Importing model
const Workout = require('../models/workout')

// GET /workouts
async function index(req, res, next) {
    // want to query workouts collection and return all workouts, 
    // passing them into the render template
    const allWorkouts = await Workout.find({})
    console.log(allWorkouts)
    console.log(allWorkouts[0].likes)
    console.log(allWorkouts[1].likes)
    console.log(allWorkouts[0].likes.length)
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
        
        for(const key in workout.toObject()){
            console.log(`${key[0].toUpperCase() + key.substring(1)}: ${workout[key]}`)
        }

        res.render('workouts/show', {
            workout,
            title: workout.name
        })
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        // next() moves on to error middleware if id doesn't match
        // could instead use res.render() - to link to a view such as 
        // workout not found -> such as workouts/notFound.ejs
        next()
    }
}

// Get /workouts/new
async function newWorkout(req, res, next) {
    res.render('workouts/new', { title: 'Add Workout', errorMessage: '' })
}

// POST /workouts
async function create(req, res, next) {
    try {
        // req.body to see everything that is passed from the form
        // console.log(req.body)
        // const exercisesTrimmed = req.body.exercises.trim()
        // const exercisesAsArray = exercisesTrimmed.split(/\s*,\s*/)

        // spreading in all values, then reassign values after, so it applies spread
        // and formatting before pulling through
        const body = {
            ...req.body,
            // ! removed for now -> further work and array implementation needed
            // exercises: req.body.exercises.trim().split(/\s*,\s*/)
        }
        // submitting doc to the database
        const createdWorkout = await Workout.create(body)
        console.log(createdWorkout._id)

        // on success - redirect user to newly created workout on show route
        res.redirect(`/workouts/${createdWorkout._id}`)
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        // for now, will res.render same page and send an error message
        // ! later can change to pass certain info down
        res.render('/workouts/new', { errorMessage: err.message })
    }
}

// DELETE /workout/:id
async function deleteWorkout(req, res, next) {
    try {
        const { id } = req.params
        const workout = await Workout.findById(id)
        // could be more concise, by using:
        // await Workout.deleteOne({ _id: id })
        // ? But I want to implement a render to a delete confirmation screen, which I 
        // ? will add later if/when I have time
        // ? res.render(`workouts/${workout._id}/delete`, { workout })
        await workout.deleteOne()
        res.redirect('/workouts')
    } catch (err) {
        console.log('ERROR MESSAGE ->', { errorMessage: err.message })
        next()
        // next() moves on to error middleware if id doesn't match
        // could instead use res.render() - to link to a view such as 
        // workout not found -> such as workouts/notFound.ejs
    }
}

// GET /workouts/:id/edit -> renders edit form view on client side
async function edit(req, res, next) {
    try {
        const { id } = req.params
        const workout = await Workout.findById(id)
        console.log(workout)
        res.render('workouts/edit', { title: `Edit ${workout.name}`, workout, errorMessage: '' })
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next()
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params
        const workoutDocument = await Workout.findById(id)
        Object.assign(workoutDocument, req.body)
        console.log('WORKOUT DOC AFTER MERGE ->', workoutDocument)
        await workoutDocument.save()
        // res.render('/workouts/show', { title: workoutDocument.name, workout: workoutDocument.toObject() })
        // res.redirect(`/workouts/${workoutDocument._id}`, { title: workoutDocument.name, workout: workoutDocument.toObject() })
        res.redirect(`/workouts/${workoutDocument._id}`)
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        res.render('workouts/edit', { title: 'Update Workout', errorMessage: err.message })
    }
}

module.exports = {
    index,
    show,
    new: newWorkout,
    create,
    delete: deleteWorkout,
    edit,
    update
    // confirmDeleteWorkout
}

// // DELETE confirmation /workout/:id/confirm-delete
// async function confirmDeleteWorkout(req, res, next) {
//     try {
//         const { id } = req.params
//         await Workout.deleteOne({ _id: id })
//         res.redirect('/workouts')
//     } catch (err) {
//         console.log('ERROR MESSAGE ->', { errorMessage: err.message })
//         next()
//         // next() moves on to error middleware if id doesn't match
//         // could instead use res.render() - to link to a view such as 
//         // workout not found -> such as workouts/notFound.ejs
//     }
// }