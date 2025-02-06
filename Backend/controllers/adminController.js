const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/AdminSchema");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "1234";

// Admin Registration
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new AdminModel({ username, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering admin" });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await AdminModel.findOne({ username });

        if (!admin) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id, role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ success: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Protected Route
const adminProtectedRoute = (req, res) => {
    res.json({ message: `Welcome Admin! Your ID: ${req.admin.id}` });
};

module.exports = {
    registerAdmin,
    loginAdmin,
    adminProtectedRoute
};
