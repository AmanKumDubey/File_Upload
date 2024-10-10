const mongoose= require("mongoose");

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    Url:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

fileSchema.post("save",async function (doc) {
    try{
        console.log("DOC",doc);
    } catch(error){
        console.error(error);
    }
})

const File=mongoose.model("File",fileSchema);
module.exports=File;