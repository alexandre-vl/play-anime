const router = require('express').Router();
const { isAuthenticated, isAdmin } = require('../database/database');
const Movie = require('../models/Movie');

router.get('/', isAuthenticated, isAdmin, async (req, res) => {
    let movies = await Movie.find()
    res.render('dashboard', {user: req.user, logged: !!req.user, movies: movies})
})

router.get('/settings' , isAuthenticated, (req, res) => {
    res.sendStatus(200)
})

router.get('/create' , isAuthenticated, isAdmin, (req, res) => {
    res.render('partials/dashboard/create', {user: req.user, logged: !!req.user})
})

router.post('/delete' , isAuthenticated, isAdmin, (req, res) => {
    Movie.deleteOne({_id: req.body.id}, (err) => {
        if (err) {
            console.log(err)
            return res.json({message: 'error'})
        }
    })
    res.json({message: 'deleted'})
})

router.get('/edit', isAuthenticated, isAdmin, async (req, res) => {
    try {
        let movie = await Movie.findOne({_id: req.query.id})
        res.render('partials/dashboard/edit', {user: req.user, logged: !!req.user, anime: movie})
    } catch (error) {
        return res.status(404).send('Not found')
    }
})

module.exports = router;