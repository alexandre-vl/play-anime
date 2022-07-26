const router = require('express').Router();
const Movie = require('../models/Movie');
const mongodb = require("mongodb");

router.get('/', async (req, res) => {
    console.log(req.query.name)
    let result = await Movie.find({name: req.query.name})
    if (result.length < 1) return res.status(404).send('Not found')
    console.log(result)
    res.render('anime', {user: req.user, logged: !!req.user, anime: result[0], temp: {}})
})

module.exports = router;