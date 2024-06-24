import { checkToken } from "./../middlewares/checkJWT";
import express from "express";
import { getComments, addComment } from "../controllers/comments.controller";

const router = express.Router();

// http://localhost:3012/api/comments/
router.get("/", getComments);
// http://localhost:3012/api/comments/add
router.post("/add", checkToken, addComment);

export default router;
