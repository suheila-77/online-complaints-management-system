
const express = require("express")
const connectDB = require("./database/database");
const mongoose= require("mongoose")
const cors = require("cors")
const { config } = require('dotenv');
const app = express()
const adminRoutes = require("./router/adminRouter");
const userRoutes = require("./router/userRoute")
const complaintRoutes = require("./routes/complaintRoutes");
app.use("/api", complaintRoutes);
// Load environment variables
config();

// Connect to database
connectDB();
app.use(express.json())

app.use(cors())
app.use(adminRouter)
app.use(complaintRouter)

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
