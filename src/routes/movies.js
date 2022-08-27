const router = require('express').Router();
const {fetchDb, shuffleArray, isAdmin} = require('../database/database')
const config = require('../config/admin.json')

router.get('/', async (req, res) => {
    res.render('movies', {admins: config.admins, user: req.user, logged: !!req.user, data:  {movies: shuffleArray(await fetchDb({type: 'movie', sort:"rating,desc"}))}})
})

module.exports = router;