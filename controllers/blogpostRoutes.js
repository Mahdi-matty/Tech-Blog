const express = require("express");
const router = express.Router();
const { User, BlogPost } = require("../models");

//find all
router.get("/", (req, res) => {
  BlogPost.findAll()
    .then((dbBlogPost) => {
      res.json(dbBlogPost);
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});
//find one
router.get("/:id", (req, res) => {
  BlogPost.findByPk(req.params.id, {
    include: [User],
  })
    .then((dbBlogposts) => {
      if (!dbBlogposts) {
        res.status(404).json({ msg: "no such BlogPost!" });
      } else {
        res.json(dbBlogposts);
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});
//create
router.post("/", (req, res) => {
  if (!req.session.user) {
    res.status(403).json({ msg: "login first to join the club!" });
  } else {
    BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      date: req.session.user.date,
    })
      .then((newTodo) => {
        res.json(newTodo);
      })
      .catch((err) => {
        res.status(500).json({ msg: "oh no!", err });
      });
  }
});
//edit
router.put("/:id", (req, res) => {
  if (!req.session.user) {
    res.status(403).json({ msg: "login first to join the club!" });
  } else {
  BlogPost.update(
    {
        title: req.body.title,
        content: req.body.content,
        date: req.session.user.date,
    },
    {
      where: {
        id: req.params.id,
        UserId:req.session.user.id
      },
    }
  )
    .then((editBlogPost) => {
      if (!editBlogPost[0]) {
        res.status(404).json({ msg: "no such BlogPost!" });
      } else {
        res.json(editBlogPost);
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
  }
});
//delete
router.delete("/:id", (req, res) => {
  BlogPost.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delTodo) => {
      if (!delTodo) {
        res.status(404).json({ msg: "no such BlogPost!" });
      } else {
        res.json(delTodo);
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: "oh no!", err });
    });
});

module.exports = router;