import mongoose from "mongoose";

const post = new mongoose.Schema({
  imageUrl: {
    type:String,
    required:true
  },
  title: {
    type:String,
    required:true
  },
  slug: {
    type:String,
    required:true
  },
  authorImage: {
    type:String,
    required:true
  },
  author: {
    type:String,
    required:true
  },
  content: {
    type:String,
    required:true
  },
  
}, {
    timestamps : true ,
});


const CreatePost = mongoose.models.userposts || mongoose.model("userposts" , post );

export default CreatePost ;