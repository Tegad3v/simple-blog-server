import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log("Connected to db successfully"));
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

export default connectDb;
