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

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    res.render('home', {user: req.user, logged: !!req.user, data:  {trend: shuffleArray(await fetchDb({sort:"rating,desc"})), series: shuffleArray(await fetchDb({type: 'Serie', sort:"rating,desc"})), movies: shuffleArray(await fetchDb({type: 'Movie', sort:"rating,desc"}))}})

})

module.exports = router;