const express = require("express");
const path = require("path");
const router = express.Router();
const destinationController = require("../controllers/destinationController");
const authenticationService = require("../services/authentication.js");

//Middlewar

router.get("/:id/edit",authenticationService.authenticateJWT, authenticationService.checkIfAdmin);

//Routes

router.get("/", destinationController.getDestination);

router.get("/:id", destinationController.getDestination);

router.post("/:id", destinationController.updateDestination);

router.get("/:id/edit", destinationController.editDestination);

module.exports = router;