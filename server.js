const express=require("express")
require('dotenv').config()
const cors = require("cors")
const colors=require("colors")
const morgan=require("morgan")
const router=require('./routes/userRoutes')
const adminrouter=require('./routes/adminRoutes')
const DataBaseConnection =require('./config/db')
const app=express()
app.use(express.json())
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: false
}))
app.use(morgan("dev"))
app.use('/api/doctor',require('./routes/doctorRoutes'))
app.use('/api',router)
app.use('/api/admin',adminrouter)

DataBaseConnection()
const port= process.env.PORT || 3001


app.listen(port,()=>{
    console.log(`Server IS Running At ${port}`.bgBlue)
})