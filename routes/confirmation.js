const express = require("express");
const path = require("path");
const router = express.Router();
const {authenticateJWT} = require("../services/authentication");
const {getConfirmation} = require("../controllers/confirmationController");

router.get("/:id", authenticateJWT, getConfirmation);

module.exports = router;