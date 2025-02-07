const express = require("express");
const { registerAdmin, loginAdmin, adminProtectedRoute } = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/adminAuth"); // Import middleware

const router = express.Router();

router.post("/admin/create", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/protected", verifyAdmin, adminProtectedRoute);

module.exports = router;
