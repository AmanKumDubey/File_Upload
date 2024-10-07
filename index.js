// import express from "express";
// import dotenv from "dotenv";
// import fileupload from  "express-fileupload";
// import cloudinary from "./config/cloudinary.js";
// import Upload from "./routes/FileUpload.js"
// import db from "./config/db.js";

const express= require("express");
require("dotenv").config();
const fileupload =require("express-fileupload");
const cloudinary  =require("./config/cloudinary");
const Upload = require("./routes/FileUpload");
const db= require("./config/db");

const app= express()




// find PORT
const PORT=process.env.PORT || 4000

// middleware add
app.use(express.json());
app.use(fileupload());

// db connection
db.connect();

// connect to cloud
cloudinary.cloudinaryConnect();


// api route mount
app.use('/api/v1/upload',Upload);

// apps start
app.listen(PORT,()=>{
    console.log("APP is Running ");
})




