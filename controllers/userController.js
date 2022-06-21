const userModel = require("../models/userModel");


function getUsers(req, res, next) {
    userModel.getUsers()
        .then((users) => res.render("users", {users}))
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function getUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then((user) => {
            console.log(user);
            if(user) {
                res.render("user", {user:user});
            } else {
                res.status(404).render("error", {error: {code: 404, message: "This user is not available"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function editUser(req, res, next) {
    userModel.getUser(req.params.id)
        .then((user) => {
            console.log(user);
            if(user) {
                res.render("editUser", {user});
            } else {
                res.status(404).render("error", {error: {code: 404, message: "This user is not available"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function deleteUser(req,res,next) {
    console.log(req.params.id);
    userModel.deleteUser(req.params.id)
        .then(() => res.render("index",{}))
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));

}

function updateUser(req, res, next) {
    console.log(req.body);
    userModel.updateUser(req.body)
        .then((user) => res.render("user", {user}))
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function insertUser(req, res) {
    console.log(req.body);
    userModel.insertUser(req.body)
        .then((user) => {
            res.redirect("/login");
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

module.exports = {
    getUsers,
    getUser,
    editUser,
    updateUser,
    deleteUser,
    insertUser
}