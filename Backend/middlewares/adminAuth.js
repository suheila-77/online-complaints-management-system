const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Middleware to Verify Admin Authentication
const verifyAdmin = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        if (verified.role !== "admin") {
            return res.status(403).json({ error: "Forbidden. Admin access only." });
        }
        req.admin = verified; // Attach admin data to request
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = verifyAdmin;
