import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// http://localhost:3012/api/upload
router.post("/", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    return res.status(200).json(file?.filename);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

export default router;
