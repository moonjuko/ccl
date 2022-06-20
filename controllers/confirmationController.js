
const destinationModel = require("../models/destinationModel");
const {authenticateJWT} = require("../services/authentication");

function getConfirmation(req, res, next) {
    console.log(req.params.id , req.user)
    destinationModel.getDestination(req.params.id)
        .then((destination) => {
            console.log(destination);
            if(destination) {
                res.render("confirmation", {destination, user:req.user});
            } else {
                res.status(404).render("error", {error: {code: 404, message: "This destination is not available"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

module.exports = {
    getConfirmation,
}