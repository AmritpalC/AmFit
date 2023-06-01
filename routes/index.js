const express = require('express');
const router = express.Router();
// require passort
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // User to pick account every time
    prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/workouts',
    failureRedirect: '/workouts'
  }
));

// OAuth logout route -> logout automatically added to req object by passport
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/workouts');
  });
});

module.exports = router;