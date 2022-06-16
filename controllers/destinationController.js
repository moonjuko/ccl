const destinationModel = require("../models/destinationModel");

function getDestinations(req, res, next) {
    destinationModel.getDestinations()
        .then((destinations) => res.render("destinations", {destinations}))
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function getDestination(req, res, next) {
    destinationModel.getDestination(req.params.id)
        .then((destination) => {
            console.log(destination);
            if(destination) {
                res.render("destination", {destination});
            } else {
                res.status(404).render("error", {error: {code: 404, message: "This destination is not available"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function editDestination(req, res, next) {
    destinationModel.getDestination(req.params.id)
        .then((destination) => {
            console.log(destination);
            if(destination) {
                res.render("editDestination", {destination});
            } else {
                res.status(404).render("error", {error: {code: 404, message: "This flower is not available"}});
            }
        })
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

function updateDestination(req, res, next) {
    console.log(req.body);
    destinationModel.updateDestination(req.body)
        .then((destination) => res.render("destination", {destination}))
        .catch((error) => res.status(500).render("error", {error: {code: 500, message: "Server error"}}));
}

module.exports = {
    getDestinations,
    getDestination,
    editDestination,
    editDestination,
    updateDestination
}