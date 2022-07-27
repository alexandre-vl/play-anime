const router = require('express').Router();
const Movie = require('../models/Movie');
const mongodb = require("mongodb");

router.get('/', async (req, res) => {
    let result = await Movie.find({name: req.query.name})
    if (result.length < 1) return res.status(404).send('Not found')
    res.render('anime', {user: req.user, logged: !!req.user, anime: result[0], temp: {}})
})

router.post('/episodes', async (req, res) => {

    let result = await Movie.find({name: req.body.anime_name})

    if (result.length < 1) return res.status(404).send('Not found')
    let anime = result[0]
    let player = anime.videos.players.find(e => e.id === parseInt(req.body.player_id)?? 1)

    if (!player) return res.status(404).send('Not found')
    let episode = player.episodes.find(e => e.id === parseInt(req.body.ep_id) ?? 1)
    console.log(episode)
    if (!episode) return res.status(404).send('Not found')
    res.json({url: episode.url})
})

module.exports = router;