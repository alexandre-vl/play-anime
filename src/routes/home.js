const router = require('express').Router();
const p = require('phin')

router.get('/', async (req, res) => {
    async function fetchDb(filter = {}) {
        const request = await p({
            'url': 'http://localhost:3000/api/?' + new URLSearchParams(filter),
            'parse': 'json'
        }).catch(err => {
            console.log(err)
        })
        return request.body.movies
    }
    res.render('home', {user: req.user, logged: !!req.user, data:  {trend: await fetchDb({}), series: await fetchDb({type: 'Series'}), movies: await fetchDb({type: 'Movie'})}})

})

module.exports = router;