const express = require("express");
const { register, login, getUsers } = require("../controllers/authController");
const router = express.Router();

// Auth Router
router.post("/register", register);
router.post("/login", login);

router.get("/user", getUsers);

module.exports = router;