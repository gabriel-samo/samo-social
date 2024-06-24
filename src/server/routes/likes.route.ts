import express from "express";
import { checkToken } from "../middlewares/checkJWT";
import { getLikes, addLike } from "../controllers/likes.controller";

const router = express.Router();

// http://localhost:3012/api/likes/
router.get("/", getLikes);
// http://localhost:3012/api/likes/add
router.post("/add", checkToken, addLike);

export default router;
