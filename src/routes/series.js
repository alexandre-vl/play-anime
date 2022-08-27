const router = require('express').Router();
const {fetchDb, shuffleArray} = require('../database/database')
const config = require('../config/admin.json')

router.get('/', async (req, res) => {

    res.render('series', {admins: config.admins, user: req.user, logged: !!req.user, data:  {series: shuffleArray(await fetchDb({type: 'serie', sort:"rating,desc"}))}})

})

module.exports = router;