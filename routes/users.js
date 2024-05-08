const express = require("express");
const { createUser, login, profile } = require("../controllers/users");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// @router GET && POST /api/v1/users
router.route("/createUser").post(createUser);
router.route("/login").post(login);
router.route("/profile").get(authenticateToken, profile);

module.exports = router;
