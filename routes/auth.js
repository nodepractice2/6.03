const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const User = require('../models/user');
const Post = require('../models/post');
const verb = "dd";
const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, introduce } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
      introduce,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      var Nick = user.nick; 
      module.exports.nick = Nick;
      var Email =user.email;
      module.exports.email = Email;
      console.log(Nick);
      console.log(typeof(Nick));
      return res.redirect('/main');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.post('/main/db',(req,res,next) => {
  Post.findAll().then(function(results){
    var postdata = results;
    res.render(postdata);
  }).catch(function(err){
    console.error(err);
  })
})


var Nick1 = 'sss';
var num = 7;


module.exports.router = router;

