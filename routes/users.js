var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/bulletinboard");


//Home page
router.get("/home", function (req, res, next) {
  res.render("home", { title: "CRUD" });
});

//Signup
router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", function (req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username,
      },
      defaults: {
        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Password: authService.hashPassword(req.body.password),
      },
    })
    .spread(function (result, created) {
      if (created) {
        res.redirect("login");
      } else {
        res.send("This user already exists");
      }
    });
});

/* Login user and reutrn JWT as a cookie */
router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post("/login", function (req, res, next) {
  models.users
    .findOne({
      where: { Username: req.body.username },
    })
    .then((user) => {
      if (!user) {
        res.send("Invalid Login!");
      } else {
        let passwordMatch = authService.comparePasswords(
          req.body.password,
          user.Password
        );
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie("jwt", token);
          res.redirect("profile");
        } else {
          res.send("wrong password");
        }
      }
    });
});

//Profile
router.get("/profile", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user) {
        models.users
          .findOne({
            where: {
              Username: user.Username
            },
            include: [
              {
                model: models.posts,
               where: {Deleted: false},
               required: false
              },
            ],
          })
          .then((userpostsFound) => {
            res.render("profile", { userData: userpostsFound });
          });
      } else {
        res.status(401);
        res.send("Log in please");
      }
    });
  }
});

//Logout
router.get("/logout", function (req, res, next) {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.redirect("login");
});

//Admin
router.get("/admin", function (req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user.Admin) {
        models.users
          .findAll({ where: { Deleted: false }, raw: true })
          .then((usersFound) => res.render("admin", { userData: usersFound }));
      } else {
        res.send("unauthorized to visit");
      }
    });
  }
});

//Admin Edit
router.get("/admin/editUser/:id", function (req, res, next) {
 let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user.Admin) {
        models.users
          .findOne({
            where: { UserId: userId },
            include: [{ model: models.posts }],
          })
          .then((userpostsFound) => {
            res.render("editUser", { userData: userpostsFound });
          });
      } else {
        res.status(401);
        res.send("cannot view user");
      }
    });
  }
});

router.post("/admin/delete/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then((user) => {
      if (user.Admin) {
        models.users
          .update({ Deleted: true }, { where: { UserId: userId } })
          .then((user) => res.redirect("/users/admin"));
      } else {
        res.send("There was a problem deleting the user");
      }
    });
  }
});

module.exports = router;
