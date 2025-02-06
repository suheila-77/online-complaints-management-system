const express = require("express");
const { createComplaint, getAllComplaints,  deleteComplaint } = require("../controller/complaintController");

const router = express.Router();

router.post("/complaint", createComplaint);
router.get("/complaint/management", getAllComplaints);
router.delete("/complaint/delete/:id", deleteComplaint);

module.exports = router;
