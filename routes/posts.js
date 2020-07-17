var express = require("express");
var router = express.Router();
var models = require("../models");
var bulletinboardService = require("../services/bulletinboard");
const authService = require("../services/bulletinboard");

router.get("/createPost", function (req, res, next) {
  res.render("posts");
});

router.post("/createPost", function (req, res, next) {
  let token = req.cookies.jwt;
  models.users;
  authService.verifyUser(token).then((user) => {
    if (user) {
      models.posts
        .findOrCreate({
          where: {
            UserId: user.UserId,
            PostTitle: req.body.postTitle,
            PostBody: req.body.postBody,
          },
        })
        .spread(function (result, created) {
          if (created) {
            res.redirect("/users/profile");
          } else {
            res.send("Post failed to upload");
          }
        });
    }
  });
});

router.get("/editPost/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  models.users;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.posts
          .findByPk(postId)
          .then((post) => res.render("editPost", { post }));
      } else {
        res.send("There was a problem ");
      }
    });
  }
});

router.post("/editPost/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.posts
          .update(
            { PostTitle: req.body.postTitle, PostBody: req.body.postBody },
            { where: { PostId: postId } }
          )
          .then((user) => res.redirect("/users/profile"));
      } else {
        res.send("Sorry, there was a problem editing this post.");
      }
    });
  }
});

//Admin Post Delete
router.post("/admin/deletePost/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user.Admin) {
        models.posts
          .update({ Deleted: true }, { where: { PostId: postId } })
          .then((user) => res.redirect("/users/admin"));
      } else {
        res.send("You are not logged in as an admin. Unable to delete post.");
      }
    });
  }
});

//User Delete
router.post("/deletePost/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.posts
          .update({ Deleted: true }, { where: { PostId: postId } })
          .then((user) => res.redirect("/users/profile"));
      } else {
        res.send("Unable to delete");
      }
    });
  }
});

module.exports = router;
