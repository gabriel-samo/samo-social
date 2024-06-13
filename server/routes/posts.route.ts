import { checkToken } from "./../middlewares/checkJWT";
import express from "express";
import { getPosts, addPost } from "../controllers/posts.controller";
const router = express.Router();

// http://localhost:3012/api/posts
router.get("/", checkToken, getPosts);
// http://localhost:3012/api/posts/add
router.post("/add", checkToken, addPost);

export default router;
