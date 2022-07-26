const router = require('express').Router();
const {fetchDb, shuffleArray} = require('../database/database')

router.get('/', async (req, res) => {

    res.render('series', {user: req.user, logged: !!req.user, data:  {series: shuffleArray(await fetchDb({type: 'Serie', sort:"rating,desc"}))}})

})

module.exports = router;