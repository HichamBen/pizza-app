const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userM");
const { isValidPass } = require("../gen&valid");

// custom field
const customField = {
    usernameField: "email",
    password: "password"
}

// verify callback
const verifyCall = async (username, password, done) => {
    try {
        const user = await User.findOne({ email: username });

        if (!user) return done(null, false);

        // verify password   
        const isValid = isValidPass(password, user.hash, user.salt);
        if (!isValid) return done(null, false);

        return done(null, user)

    } catch (err) {
        return done(err);
    }
}

// config passport to use local authentication
passport.use(new LocalStrategy(customField, verifyCall));

// google oauth2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://pizza-app-mern.onrender.com/api/user/auth/google/home",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {

        try {
            const user = await User.findOne({ googleId: profile.id });

            if (!user) {
                const newUser = new User({
                    username: profile.name.givenName,
                    email: profile.email,
                    googleId: profile.id,
                });
                return done(null, await newUser.save());
            }
            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
));

// Facebook oauth2
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://pizza-app-mern.onrender.com/api/user/auth/facebook/home",
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const user = await User.findOne({ facebookId: profile.id });

            if (!user) {
                const newUser = new User({
                    username: profile.displayName,
                    facebookId: profile.id,
                });
                return done(null, await newUser.save());
            }
            return done(null, user);

        } catch (err) {
            return done(err);
        }
  }
));


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false)
    }
})
