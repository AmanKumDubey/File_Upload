const mongoose=require("mongoose");


 require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlparser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB Connection Successful"))
    .catch((error)=>{
        console.log("DB CONNECTION ISSUES !");
        console.error(error);
        process.exit(1);
    })
}