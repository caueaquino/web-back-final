const passport = require('passport');
const User = require("../model/UserModel");

exports.login = (req, res, next) => {
  const {body: user} = req;

  if (!user.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/',
    successFlash: 'Welcome!',
    failureFlash: 'Invalid username or password.',
  }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }
    if (passportUser) {
      const user = passportUser;
      user.token = user.generateJWT();

      res.cookie('currentUser', user.toAuthJSON(), {httpOnly: true})
          .cookie('token', user.token, {httpOnly: true});
    }

    return res.status(400)
        .redirect('/');
  })(req, res, next);
};

exports.index = async(req, res) => {
  const users = await User.find();
  return res.json(users);
}

exports.current = (req, res) => {
  const {payload: {id}} = req;

  return User.findById(id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(400);
        }

        return res.json({user: user.toAuthJSON()});
      });
};

exports.logout = (req, res) => {
  req.logout();
  res.clearCookie('token')
      .clearCookie('currentUser')
      .status(200)
      .redirect('/');
};


exports.register = (req, res) => {
  const user = new User({
    name: req.body.name
  });
  user.setPassword(req.body.password);
  user.save((err) => {
    if (err) {
      res.json({error: 'saving error'});
    }
    res.json({name: req.body.name ,password: req.body.password});
  });
};