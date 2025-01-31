const jwt = require("jsonwebtoken");
const UserModel = require("../model/userSchema"); // Import User model
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Middleware to authenticate users
const verifyUser = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = await UserModel.findById(verified.id); // Get user info from DB
        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = verifyUser;
