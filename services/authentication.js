const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = require("../secrets.js").access_token_secret;
const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");


async function checkPassword(password, hash,) {
    let pw = await bcrypt.compare(password, hash);
    return pw;
}

function authenticateUser({username, password}, users, res) {

    const user = users.find(u => {return u.username === username && u.password === password;});

    if(user) {
        const accessToken = jwt.sign({id: user.id, username: user.username}, ACCESS_TOKEN_SECRET);
        res.cookie("accessToken", accessToken);
        console.log(accessToken);
        res.redirect("/users/" + user.id);
    } else {
        res.send("Username or password are incorrect");
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies["accessToken"];

    if(token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).render("error", {error: {code: 403, message: "Unauthorised access"}});

            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.status(401).render("error", {error: {code: 401, message: "Unauthorised access"}});
    }
}

function checkIfOwner(req, res, next) {

    console.log("Hello from owner check");

    if(req.params.id) {
        if(req.params.id === (req.user.id).toString()) {
            console.log("You are the owner of this page");
            next("route");
        } else {
            console.log("You are not the owner");
            next();
        }
    } else {
        next();
    }
}

function checkIfAdmin(req, res, next) {
    console.log("Hello from admin check");
    console.log("You are the user with id: " + req.user.id);

    userModel.getAdmins()
        .then(admins => {
            const admin = admins.find(a => {return a.id === req.user.id;});

            if(admin) {
                console.log("You are allowed to proceed");
                next("route");
            } else {
                console.log("You are not an admin");
                res.status(401).render("error", {error: {code: 401, message: "Unauthorised access"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

module.exports = {
    authenticateUser,
    authenticateJWT,
    checkIfAdmin,
    checkIfOwner
}