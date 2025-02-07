
const mongoose  = require("mongoose")

const complaintSchema = mongoose.Schema({


    Title: {
        type: String,
        required: true,
    },


    Description: {
        type: String,
        required: true,
    },
    email: { type: String, required: true }, 

})

module.exports  = mongoose.model("complains", complaintSchema)