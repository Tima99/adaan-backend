import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((error) => {
      console.log("Issue in connection");
      console.error(error.message);
      process.exit(1);
    });
};
export default connect;
