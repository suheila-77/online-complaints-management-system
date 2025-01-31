const express = require("express");
const { registerUser, loginUser, protectedRoute } = require("../controllers/userController");
const verifyUser = require("../middlewares/userAuth");

const router = express.Router();

router.post("/user/create", registerUser);
router.post("/user/login", loginUser);
router.get("/user/protected", verifyUser, protectedRoute);

module.exports = router;
