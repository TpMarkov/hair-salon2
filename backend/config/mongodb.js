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

import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null};
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("MongoDB connected ✅");
  return cached.conn;
};

export default connectDB;

