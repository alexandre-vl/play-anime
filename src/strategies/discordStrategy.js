const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../models/DiscordUser');

passport.serializeUser((user, done) => {
    console.log("Serialize");
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing");
    const user = await DiscordUser.findById(id);
    if(user)
        done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email' ,'guilds', 'guilds.join'],
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({discordId: profile.id})
        if (user){
            await user.updateOne({
                discordId: profile.id,
                username: profile.username,
                discriminator: profile.discriminator,
                avatar: profile.avatar,
                email: profile.email,
                guilds: profile.guilds,
            });
            done(null, user);
        }else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username,
                discriminator: profile.discriminator,
                avatar: profile.avatar,
                email: profile.email,
                guilds: profile.guilds,
            })
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    }catch (err) {
        console.log(err);
        done(err, null);
    }
}))


