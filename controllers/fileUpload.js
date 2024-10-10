// import File from "../models/File";
const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File")
const cloudinary= require("cloudinary").v2;

// localfile upload

exports.localFileUpload= async (req,res)=>{
    try{

        // fetch file
        const file=req.files.file;
        console.log(file);
        
        let path=__dirname+ "/files/"+Date.now()+ `.${file.name.split('.')[1]}` ;
        console.log(path);
        file.mv(path,(err)=>{
            console.log(err);
        })

        res.json({
            success:true,
            message:'Local file uploaded Successfully '
        })

    } catch(error){
        console.error(error);
        
    }
}

// Cheak Validation

function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}

// Upload on Cloudinary
async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    console.log("Temp file Path ,", file.tempFilePath);
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// Image upload

exports.imageUpload=async (req,res)=>{
    try{

        // data fetch
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes=["jpg","png","jpeg"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(" File Type ",fileType);


        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not supported ",
            })
        }
        // file format supported
        console.log("Uploading to FileUpload ");
        const response=await uploadFileToCloudinary(file,"FileUpload");
        console.log(response);

        // have to save DB entry
        const fileData= await File.create({
            name,
            tags,
            email,
            Url:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded ',
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

// VideoUpload Handler

exports.videoUpload=async (req,res)=>{
    try{
        // data fetch
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.videoFile;

        //validation
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type ",fileType);

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // File Uploading
        console.log("Uploading Files" );
        const response=await uploadFileToCloudinary(file,"FileUpload");
        console.log(response);

        // have to creeate or save in db
        const fileData=await File.create({
            name,
            email,
            tags,
            Url:response.secure_url
        })

        res.json({
            success:true,
            videoUrl:response.secure_url,
            message:"Successfully Video Uploaded ",
        })
    } catch(error){
        console.log("Failed To Upload !");
        console.error(error);
    }
}

// Image Reduce Handler
exports.imageReducerUpload=async (req,res)=>{
    try{

        // data fetch
        const {name,email,tags}=req.body;
        console.log(name,email,tags);

        const file=req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes=["jpg","png","jpeg"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log(" File Type ",fileType);


        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not supported ",
            })
        }
        // file format supported
        console.log("Uploading to FileUpload ");
        const response=await uploadFileToCloudinary(file,"FileUpload",30);
        console.log(response);

        // have to save DB entry
        const fileData= await File.create({
            name,
            tags,
            email,
            Url:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image Successfully Uploaded ',
        })

    } catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}
