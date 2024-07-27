import express from "express";
import { createUpdate, updateProfileTab, readProfileTab } from "../controllers/profile.controller.js";
import { imageUpload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post("/basicDetail", imageUpload.single("image"), createUpdate);
router.patch("/:tabName", updateProfileTab);
router.get("/:tabName", readProfileTab);

export default router;
