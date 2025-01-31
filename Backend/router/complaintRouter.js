const express = require("express");
const { createComplaint, getAllComplaints, updateComplaint, deleteComplaint } = require("../controllers/complaintController");

const router = express.Router();

router.post("/complaint", createComplaint);
router.get("/complaint/management", getAllComplaints);
router.put("/complaint/update/:id", updateComplaint);
router.delete("/complaint/delete/:id", deleteComplaint);

module.exports = router;
