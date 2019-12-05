const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;

const User = require('../model/UserModel');

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
}, (name, password, done) => {
  User.findOne({name: name})
      .then((user) => {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {errors: {'name or password': 'is invalid'}});
        }

        return done(null, user, {message: 'Logged In Successfully'});
      }).catch(done);
}));

passport.use(new JWTStrategy({
  jwtFromRequest: (req) => req.cookies.token,
  secretOrKey: 'SECRET',
}, (jwtPayload, done) => {
  if (Date.now() > jwtPayload.exp) {
    return done('jwt expired', false);
  }

  return done(null, jwtPayload);
}
));
