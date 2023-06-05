const Workout = require('../models/workout');

async function create(req, res, next) {
    try {
        const { id } = req.params
        const workout = await Workout.findById(id)
        const userId = req.user._id
        // checking to see if user has already liked the workout
        const likedIndex = workout.likes.findIndex((like) => like.user.equals(userId))
        // user hasn't liked the workout yet, add a like
        if (likedIndex === -1) {
            workout.likes.push({ user: userId })
        // user has liked the workout, remove their like
        } else {
            workout.likes.splice(likedIndex, 1)
        }
        await workout.save()
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next()
    }
    res.redirect('/workouts')
}

module.exports = {
    create
}