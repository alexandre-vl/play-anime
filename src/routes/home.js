const router = require('express').Router();
const {fetchDb, shuffleArray} = require('../database/database')
const config = require('../config/admin.json')

router.get('/', async (req, res) => {

    res.render('home', {admins: config.admins, user: req.user, logged: !!req.user, data:  {trend: shuffleArray(await fetchDb({sort:"rating,desc"})), series: shuffleArray(await fetchDb({type: 'serie', sort:"rating,desc"})), movies: shuffleArray(await fetchDb({type: 'movie', sort:"rating,desc"}))}})

})

module.exports = router;