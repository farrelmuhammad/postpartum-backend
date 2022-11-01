const express = require("express");
const router = express.Router();

// Auth Router
router.post("/register", register);

module.exports = router;