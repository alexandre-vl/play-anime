const router = require('express').Router();
const passport = require('passport');

router.get('/' , passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/',
    successRedirect:'/' }),
    (req, res) => {
    if (res.statusCode !== 200) {
        return res.redirect('/auth');
    }
});

router.get('/logout', (req, res, next) => {
    if (req.user) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }else {
        res.redirect('/');
    }
});


module.exports = router;