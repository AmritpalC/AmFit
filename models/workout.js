const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! change exercises to array with type objectId and ref Exercise once set up
// ! will need to add required validation to the exercises array to ensure it has >= 1 value
// ? comments & likes will be a strectch goal, so not included for now

const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number },
    exercises:[String],
    // likes: { type: String },
    // comments: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema)