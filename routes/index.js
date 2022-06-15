const express = require("express");
const router = express.Router();

const authenticationService = require("../services/authentication.js");
const userModel = require("../models/userModel")
const userController = require("../controllers/userController")
const userRouter = require("./user.js")

router.use("/user", userRouter);

router.get("/", (req, res) => {
    res.render("index");
});

router.route("/login")
    .get((req, res) => {
        res.render("login")
    })
    .post((req, res) => {
        userModel.getUsers()
            .then(users => authenticationService.authenticateUser(req.body, users, res))
            .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}))
    })

router.get("/logout", (req, res,next) => {
    res.cookie("accessToken", {maxAge: 0});
    res.redirected("/");
});

router.get("/chat", (req,res,next) => {
    res.render('chat');
})

router.post("/register", userController.insertUser);

router.get("/register", (req, res) => {res.render("register")});

module.exports = router;