import mongoose from "mongoose";

const url = process.env.mongourl;

const connectmongodb = async () => {
  try {
    await mongoose.connect(url).then(() => {
      console.log("mongodb connected");
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectmongodb;
