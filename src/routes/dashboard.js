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

router.get('/create' , isAuthenticated, (req, res) => {
    res.render('partials/dashboard/create', {user: req.user, logged: !!req.user})
})

router.post('/delete' , (req, res) => {
    console.log(req.body)
    Movie.deleteOne({_id: req.body.id}, (err) => {
        if (err) {
            console.log(err)
            return res.json({message: 'error'})
        }

    })
    res.json({message: 'deleted'})
})

router.post('/edit', async (req, res) => {
    res.render('partials/dashboard/edit', {user: req.user, logged: !!req.user, anime: req.body.anime})
})

module.exports = router;