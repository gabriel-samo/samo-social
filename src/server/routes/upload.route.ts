import express from "express";
import multer from "multer";
import fs from "fs/promises";
import config from "../config/config";
const router = express.Router();

const uploadPath = "src/server/uploads/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// http://localhost:8000/api/upload/
router.get("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    if (imageId !== "null") {
      const image = await fs.readFile("src/server/uploads/" + imageId);
      return res.setHeader("Content-Type", "image/jpg").send(image);
    } else {
      return res.json("no such image");
    }
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

router.post("/", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    return res
      .status(200)
      .json(
        `http://${config.app.host}:${config.app.port}/api/upload/${file?.filename}`
      );
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

export default router;
