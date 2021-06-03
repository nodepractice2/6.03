const express = require('express');
const user = require('../routes/auth.js');// 데이터 값 연결 ...user.nick과 user.email로 로그인한 사용자 데이터 불러오기 가능
const post = require('../models/post');

const router = express.Router();




router.get('/', (req, res) => {
    res.render('main');
    
  });

router.get('/postdata', async(req,res) => {
    try{
      var postdata = await post.findAll({});
      console.log(postdata.Post);
      res.send(postdata);
    }
    catch{
      console.error(err);
    };
})
router.post('/post/content', (res,req) =>{
    res.send(id);
})


router.post('/writedb' , async (req,res)=>{
  const { content, Tiltle} = req.body;

 try{
  await post.create({
    content,
    postTiltle : Tiltle,
    writer : user.nick ,
      });
  return res.redirect('/main');
 }catch (error) {
  console.error(error);
  return next(error);
}
});




  module.exports = router;