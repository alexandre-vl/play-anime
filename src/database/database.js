require('dotenv').config();
const mongoose = require('mongoose');
const p = require('phin');
const configAdmins = require('../config/admin.json');

module.exports.fetchDb = async function fetchDb(filter = {}) {
    const request = await p({
        'url': 'http://localhost:'+process.env.PORT+'/api/?' + new URLSearchParams(filter),
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
    }).catch(err => {return console.log(err)})
}

module.exports.isAuthenticated = function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.redirect('/');
}

module.exports.isAdmin = function isAdmin(req, res, next) {
    if (req.user) {
        if (configAdmins.admins.includes(req.user.discordId)) {
            return next();
        } else
            return res.redirect('/');
    }
    res.redirect('/');
}
