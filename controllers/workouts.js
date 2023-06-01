// GET /workouts

function index(req, res, next) {
    res.render('workouts/index',
    {
        title: 'Search Workouts'
    })
}

module.exports = {
    index
}