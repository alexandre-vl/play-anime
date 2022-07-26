const router = require('express').Router();
const {fetchDb, shuffleArray} = require('../database/database')

router.get('/', async (req, res) => {

    res.render('home', {user: req.user, logged: !!req.user, data:  {trend: shuffleArray(await fetchDb({sort:"rating,desc"})), series: shuffleArray(await fetchDb({type: 'Serie', sort:"rating,desc"})), movies: shuffleArray(await fetchDb({type: 'Movie', sort:"rating,desc"}))}})

})

module.exports = router;