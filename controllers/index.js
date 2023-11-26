const express = require('express');
const router = express.Router();
const {User,BlogPost} = require("../models");
const userRoutes = require("./userRoutes");
const BlogPostRoutes = require("./blogpostRoutes")

router.get("/",(req,res)=>{
    res.render("home")
});

router.use("/api/users",userRoutes);
router.use("/api/BlogPost",BlogPostRoutes);



router.get("/login",(req,res)=>{
    if(req.session.user){
        res.redirect("/profile")
    }
    res.render("login")
})

router.get("/profile",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    } else {
        User.findByPk(req.session.user.id,{
            include:[BlogPost]
        }).then(dbUser=>{
            const hbsUser = dbUser.toJSON()
            console.log('hbsUsers: ',hbsUser)
            res.render("profile",hbsUser)  
        })
    }
})

module.exports = router;