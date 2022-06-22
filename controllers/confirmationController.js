const userModel = require("../models/userModel");
const destinationModel = require("../models/destinationModel");
const {authenticateJWT} = require("../services/authentication");
const {authenticateUser} = require("../services/authentication")

function getConfirmation(req, res, next) {
    let user;
    userModel.getUser(req.user.id).then((result) => user = result);
    destinationModel.getDestination(req.params.id)
        .then((destination) => {
            console.log(destination);
            if(destination) {
                res.render("confirmation", {destination, user:user});
            } else {
                res.status(404).render("error", {error: {code: 404, message: "This destination is not available"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

module.exports = {
    getConfirmation,
}