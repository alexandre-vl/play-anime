const router = require('express').Router();
const Movie = require('../models/Movie');

router.post('/', async (req, res) => {
    let search = req.body.search.trim();
    let result =  await Movie.find({name: {$regex: new RegExp(search, 'i')}}).exec()
    result = result.slice(0, 5);
    res.send({search: result});
})

module.exports = router;