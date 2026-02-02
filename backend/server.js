require('dotenv').config();
const express = require("express");
const mongoose= require('mongoose');
const cors = require("cors");

const TaskRouters=require('./routers/TaskRoutes') 

const app = express();
const PORT = process.env.PORT
app.use(express.json())

app.use(cors());


app.use("/api",TaskRouters);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
     console.log("connected to dataBase");
    app.listen(PORT,()=>{
        console.log("http://localhost:"+PORT)
        console.log("Server running in",PORT)
    })
})
.catch((err)=>{
    console.log("error connecting to mongoDB")
})