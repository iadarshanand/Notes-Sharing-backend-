import mongoose from "mongoose";

const connectDB = () => {
  //connect mongoose
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DataBase connected successfully"))
    .catch((error) => console.log(error));
};

export default connectDB;
