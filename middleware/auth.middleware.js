import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isUser = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findOne({ email: payload.email }).lean();

      req.user = user;
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default isUser;
