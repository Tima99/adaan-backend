import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/mailSender.js";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import sendMail from "../utils/mailSender.js";
import otpGenerator from "otp-generator";

// Register a new user
export const register = async (req, res, next) => {
  try {
    const { email, name, phone } = req.body;

    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      return res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }

    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const data = await User.create({
      email,
      name,
      phone,
      otp: OTP,
    });

    await sendEmail(
      email,
      "The God Father: Email Verification",
      `Verify your mail With OTP: <b>${OTP}</b>`
    );

    const newUser = data.toObject();
    delete newUser.otp;

    res.status(201).json({
      status: "success",
      newUser,
      message:
        "User registered successfully!! check your mail for verification",
    });
  } catch (error) {
    next(error);
  }
};

//verify email
export const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const { otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not exists");

    const savedOTP = user.otp;

    if (savedOTP !== Number(otp)) {
      throw new Error("Invalid OTP", {
        cause: {
          status: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.otp = null;

    await user.save();

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true, //can't access from client side
    };

    const accessToken = generateJwtToken({
      phone: user.phone,
      email,
    });

    const updatedUser = user.toObject();
    delete updatedUser.otp;
    delete updatedUser.password;

    res.cookie("accessToken", accessToken, options).status(200).json({
      success: true,
      user: updatedUser,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Login a user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if (!password)
      throw new Error("Password is required", {
        cause: {
          status: 400,
        },
      });

    let user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isVerified = await bcrypt.compare(password, user.password)
    
    if (!isVerified)
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });

    const payload = {
      email: user?.email,
      id: user?._id,
    };

    const accessToken = generateJwtToken(payload);

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    delete user.password;
    delete user.otp;

    res.cookie("token", accessToken, options).status(200).json({
      success: true,
      user,
      message: "User logged in successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Logout a user
export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("token").json({
      httpOnly: true,
    });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};
