import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connect from "./dbConnection.js";
import { errorHandler } from "./utils/handle-error.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import isUser from './middleware/auth.middleware.js';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();


//middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/profile", isUser, profileRoutes);


app.use(errorHandler);

//database connection
connect();
//server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
