const router = require('express').Router();
const Movie = require('../models/Movie');
const config = require('../config/admin.json')

router.get('/', async (req, res) => {
    console.log(req.query)
    let search = req.query.q.trim();
    let result = await Movie.find({name: {$regex: new RegExp(search, 'i')}}).exec()
    console.log(result)
    res.render('search', {admins: config.admins, user: req.user, logged: !!req.user, result: result })

})

module.exports = router;