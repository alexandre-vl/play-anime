const router = require('express').Router();
const {fetchDb, shuffleArray, isAdmin} = require('../database/database')

router.get('/', async (req, res) => {
    res.render('movies', {user: req.user, logged: !!req.user, data:  {movies: shuffleArray(await fetchDb({type: 'movie', sort:"rating,desc"}))}})
})

module.exports = router;