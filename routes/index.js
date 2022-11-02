const express = require("express");
const { register, login, getUsers, getUserById, updateProfile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

// Auth Router
router.post("/register", register);
router.post("/login", login);

router.get("/user", verifyToken, getUsers);
router.get("/user/:id", verifyToken, getUserById);
router.put(
    "/profile/update",
    [verifyToken],
    updateProfile
);

module.exports = router;