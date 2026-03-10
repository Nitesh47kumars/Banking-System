import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("Server is Connecting...");
  } catch (err) {
    console.log("Server Connection Failed!");
    console.log(err);
    process.exit(1);
  }
}

export default connectToDB;
