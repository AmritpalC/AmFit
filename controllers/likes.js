const Workout = require('../models/workout');

async function create(req, res, next) {
    try {
        const { id } = req.params
        console.log(id)
        console.log(req.body)
        res.send('HIT LIKE CREATE ROUTE')
    } catch (err) {
        console.log('ERROR MESSAGE ->', err.message)
        next()
    }
}

module.exports = {
    create
}