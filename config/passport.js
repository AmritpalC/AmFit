// ? Configuring passport -> module is not middleware. Requiring Google Strategy class
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // Verify callback using async/await
    async function(accessToken, refreshToken, profile, cb) {
        // User has logged in with OAuth
        try {
            let user = await User.findOne({ googleId: profile.id });
            // Existing user found -> provide to passport
            if (user) return cb(null, user);
            // New user via OAuth!
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            return cb(null, user)
        } catch (err) {
            return cb(err);
        }
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
});