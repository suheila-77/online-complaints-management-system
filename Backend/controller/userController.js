const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userSchema");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET || "1234";

// User Registration
const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the username or email already exists
        const existingUser = await UserModel.findOne({ 
            $or: [{ username }, { email }] 
        });
        if (existingUser) return res.status(400).json({ error: "Username or Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

// User Login (Using Email or Username)
const loginUser = async (req, res) => {
    try {
        const { credential, password } = req.body; // Credential can be username or email

        // Find user by username OR email
        const user = await UserModel.findOne({
            $or: [{ username: credential }, { email: credential }]
        });

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: "user" }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ success: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};

// Protected Route
const protectedRoute = (req, res) => {
    res.json({ message: `Welcome User! Your ID: ${req.user.id}` });
};

module.exports = {
    registerUser,
    loginUser,
    protectedRoute
};
