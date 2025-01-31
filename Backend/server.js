
const express = require("express")
const connectDB = require("./database/database");
const mongoose= require("mongoose")
const cors = require("cors")
const { config } = require('dotenv');
const app = express()

// Load environment variables
config();

// Connect to database
connectDB();
app.use(express.json())

app.use(cors())


  mongoose.connect("mongodb://localhost:27017/OnlineComplaint").then(()=>{
    console.log("the database is connected successfuly")

}).catch((error)=>{
    console.log(error)
})



 app.listen  (5000,   ()=>{
    console.log("the server port is running on port 5000")
})
