require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const discordStrategy = require('./strategies/discordStrategy');
const db = require('./database/database');
const path = require('path');
const mongoose = require('mongoose');

db.connect().then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log(err);
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const movieDbRoute = require('./routes/moviesdb');
const searchRoute = require('./routes/search');
const homeRoute = require('./routes/home');
const animeRoute = require('./routes/anime');
const seriesRoute = require('./routes/series');
const moviesRoute = require('./routes/movies');

app.use(session({
    secret: process.env.CLIENT_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    saveUninitialized: false,
    resave: false,
    name:"discord.oauth2",
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    })
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/api', movieDbRoute);
app.use('/search', searchRoute);
app.use('/anime', animeRoute);
app.use('/series', seriesRoute);
app.use('/movies', moviesRoute);
app.use('/', homeRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});