import express from "express";
import { checkToken } from "./../middlewares/checkJWT";
import { getPosts, addPost, updatePost } from "../controllers/posts.controller";
const router = express.Router();

// http://localhost:3012/api/posts
router.get("/", checkToken, getPosts);
// http://localhost:3012/api/posts/update/:id
router.patch("/update/:id", checkToken, updatePost);
// http://localhost:3012/api/posts/add
router.post("/add", checkToken, addPost);

export default router;
