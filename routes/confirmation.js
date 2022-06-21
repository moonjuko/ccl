const express = require("express");
const path = require("path");
const router = express.Router();
const {authenticateJWT} = require("../services/authentication");
const {getConfirmation} = require("../controllers/confirmationController");

router.use(authenticateJWT);
router.get("/:id", getConfirmation);

module.exports = router;