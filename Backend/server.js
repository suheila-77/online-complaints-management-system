
const express = require("express")
const connectDB = require("./database/database");
const mongoose= require("mongoose")
const cors = require("cors")
const { config } = require('dotenv');
const app = express()

const adminRoutes = require("./routes/adminRouter");
const userRoutes = require("./routes/userRoute")
const complaintRoutes = require("./routes/complaintRouter");
// Load environment variables
config();

// Connect to database
connectDB();
app.use(express.json())

app.use(cors())
app.use(adminRoutes)
app.use(userRoutes)
app.use(complaintRoutes)

  mongoose.connect("mongodb://localhost:27017/OnlineComplaint").then(()=>{
    console.log("the database is connected successfuly")

}).catch((error)=>{
    console.log(error)
})


app.use("/api", adminRoutes);
app.use("/api", userRoutes )
app.use("/api", complaintRoutes)
 app.listen  (5000,   ()=>{
    console.log("the server port is running on port 5000")
})
