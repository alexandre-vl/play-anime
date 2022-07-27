const router = require('express').Router();
const Movie = require('../models/Movie');

function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/');
}

router.get('/', isAuthenticated, async (req, res) => {
    let movies = await Movie.find()
    res.render('dashboard', {user: req.user, logged: !!req.user, movies: movies})
})

router.get('/settings' , isAuthenticated, (req, res) => {
    res.sendStatus(200)
})

module.exports = router;