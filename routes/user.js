const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticationService = require("../services/authentication.js");

//Middleware
router.use(authenticationService.authenticateJWT);


router.get("/", authenticationService.checkIfAdmin);

//router.get("/:id", authenticationService.checkIfOwner, authenticationService.checkIfAdmin);

router.post("/:id", authenticationService.checkIfAdmin);

router.get("/:id/edit", authenticationService.checkIfAdmin);


//Routes
router.get("/", userController.getUsers);

router.get("/:id",  userController.getUser);

router.post("/:id", userController.updateUser);

router.get("/:id/edit", userController.editUser);

router.get("/:id/delete", userController.deleteUser);

module.exports = router;