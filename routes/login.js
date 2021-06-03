const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middleware');
const post = require('../models/post');

const router = express.Router();


router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});
router.get('/main', isLoggedIn, (req,res)=>{
res.render('main')
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join');
});

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('login', {
    twits,
  });
});


module.exports = router;