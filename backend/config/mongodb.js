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

import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1); // Fail fast
  }

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected ⚠️");
  });
}

export default connectDB;