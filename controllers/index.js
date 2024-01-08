const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,BlogPost, Comment} = require("../models");
const userRoutes = require("./userRoutes");
const BlogPostRoutes = require("./blogpostRoutes")
const commentRoutes = require('./commentsRoutes')

router.get("/",(req,res)=>{
  try {
  BlogPost.findAll({
    include:[Comment]
}).then(BlogPosts=>{
    const hbsPosts = BlogPosts.map(post=>post.toJSON());
    console.log(hbsPosts);
    res.render("home",{
        BlogPosts:hbsPosts
    })
});
} catch (error) {
console.error(error);
res.status(500).send('Internal Server Error');
}
});

router.get('/profile', (req, res) => {
    try {
        // res.render("home");
        BlogPost.findAll({
            include:[Comment]
        }).then(BlogPosts=>{
            const hbsPosts = BlogPosts.map(post=>post.toJSON());
            console.log(hbsPosts);
            res.render("profile",{
                BlogPosts:hbsPosts
            })
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});

router.use("/api/users",userRoutes);
router.use("/api/BlogPost",BlogPostRoutes);
router.use("/api/Comments",commentRoutes);

router.get("/sessiondata",(req,res)=>{
    res.json(req.session)
  })  

router.get("/login",(req,res)=>{
    if(req.session.user){
        res.redirect("/profile")
    }
    res.render("login")
})
router.post("/login", (req, res) => {
    // 1. Find the user who is trying to log in
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(foundUser => {
      if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.status(401).json({ msg: "Invalid username/password" });
      } else {
        req.session.user = {
          id: foundUser.id,
          username: foundUser.username
        };
        res.json(foundUser);
      }
    }).catch(error => {
      // Handle any potential errors here
      console.error("Error:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    });
  });
router.get("/signup",(req,res)=>{
    if(req.session.user){
        res.redirect("/profile")
    }
    res.render("signup")
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[BlogPost, Comment]
        }).then(dbUser=>{
            const hbsUser = dbUser.toJSON()
            console.log('hbsUsers: ',hbsUser)
            res.render("profile",hbsUser)  
        })
    }
})

module.exports = router;