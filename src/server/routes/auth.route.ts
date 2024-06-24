import express from "express";
import { login, register, logout } from "../controllers/auth.controller";

const router = express.Router();

// http://localhost:3012/api/auth/register
router.post("/register", register);
// http://localhost:3012/api/auth/login
router.post("/login", login);
// http://localhost:3012/api/auth/logout
router.post("/logout", logout);

export default router;
