const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

//user routes

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
