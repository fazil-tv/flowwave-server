import mongoose from "mongoose";
require('dotenv').config()

const mongoURI = process.env.MONGO_URI as string;
console.log(mongoURI);

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};