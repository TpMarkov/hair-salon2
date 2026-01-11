// import mongoose from "mongoose"
//
// const connectDB = async () => {
//   mongoose.connection.on("connected", () => {
//         console.log("MongoDB connected")
//       }
//   )
//   await mongoose.connect(`${process.env.MONGODB_URI}/hair-salon`)
// }
//
//
// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    throw err; // let the request fail naturally
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected ⚠️");
  });
};

export default connectDB;

