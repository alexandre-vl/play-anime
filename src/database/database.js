const mongoose = require('mongoose');
const p = require('phin');

module.exports.fetchDb = async function fetchDb(filter = {}) {
    const request = await p({
        'url': 'http://localhost:3000/api/?' + new URLSearchParams(filter),
        'parse': 'json'
    }).catch(err => {
        console.log(err)
    })
    return request.body.movies
}

module.exports.shuffleArray = function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports.connect =  async function connect() {
    return await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {return undefined})
}