import multer from "multer";
import { dirname, join } from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(dirname(fileURLToPath(import.meta.url)));
const imagesPath = join(__dirname, "uploads", "images");
const ACCEPTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
dotenv.config({
  path: join(__dirname, ".env"),
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function imageFileFilter(req, file, cb) {
  if (!ACCEPTED_IMAGE_FORMATS.includes(file.mimetype)) {
    req.fileError = {
      [req.fieldname]:
        "Invalid Image Format Allowed Formats are jpg | jpeg | png",
    };
    return cb(
      new Error("Invalid Image Format Allowed Formats are jpg | jpeg | png"),
      false
    );
  }
  cb(null, true);
}

const imageUpload = multer({ storage, fileFilter: imageFileFilter });
imageUpload._delete = (filename) => {
  try {
    fs.unlinkSync(join(imagesPath, filename));
  } catch (errorDeletingImage) {
    console.log({ errorDeletingImage });
  }
};
export { imageUpload, imagesPath };
