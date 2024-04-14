import mongoose from "mongoose";
const adduser = new mongoose.Schema({
    email : {
        type : String , 
        required : true,
    } ,
    username : {
        type : String ,
        required : true,
    } ,
    image : {
      type : String ,
      required : true,
    }
   
})
const addmongouser = mongoose.models.userslog || mongoose.model("userslog" , adduser);

export default addmongouser; 