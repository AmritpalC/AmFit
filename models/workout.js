const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ! change exercises to array with type objectId and ref Exercise once set up
// ! will need to add required validation to the exercises array to ensure it has >= 1 value
// ? comments & likes will be a strectch goal, so not included for now

const likeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

const workoutSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true, min: 1 },
    calories: { type: Number, min: 1 },
    exercises:[String],
    likes: [likeSchema],
    // user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    // comments: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema)