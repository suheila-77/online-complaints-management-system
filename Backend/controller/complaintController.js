const complaintModel = require("../model/complaintSchema");

// Create Complaint
const createComplaint = async (req, res) => {
    try {
        const complaint = new complaintModel(req.body);
        await complaint.save();
        res.status(201).json({ message: "Complaint has been registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering complaint" });
    }
};

// Get All Complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find();
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: "Error fetching complaints" });
    }
};

// Update Complaint
const updateComplaint = async (req, res) => {
    try {
        const updated = await complaintModel.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        res.json({ message: "Complaint has been updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating complaint" });
    }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
    try {
        await complaintModel.deleteOne({ _id: req.params.id });
        res.json({ message: "Complaint has been deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting complaint" });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    updateComplaint,
    deleteComplaint
};
