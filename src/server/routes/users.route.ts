import express from "express";
import { checkToken } from "./../middlewares/checkJWT";
import { getUser, updateUser } from "../controllers/users.controller";
const router = express.Router();

// http://localhost:3012/api/users/find/:userId
router.get("/find/:userId", checkToken, getUser);

// http://localhost:3012/api/users/update/:userId
router.put("/update/:userId", checkToken, updateUser);

export default router;
