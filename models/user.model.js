import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      index: 1,
    },
    password: {
      type: String,
    },
    otp: {
      type: Number,
      index: 1
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
