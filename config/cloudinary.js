// import cloudinary from "cloudinary";
const {cloudinary}= require("cloudinary");
require("dotenv").config();

exports.cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:processMultipart.env.CLOUD_NAME,
            api_key:processMultipart.env.API_KEY,
            api_secret:processMultipart.env.API_SECRET,
        })
    } catch(error){
        console.log(error);
    }
}
    
