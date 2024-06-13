import express from "express";
import { checkToken } from "./../middlewares/checkJWT";
import {
  addRelationship,
  getRelationship,
} from "../controllers/relationships.controller";
const router = express.Router();

// http://localhost:3012/api/relationships/
router.get("/", getRelationship);
// http://localhost:3012/api/relationships/add/
router.post("/add", checkToken, addRelationship);

export default router;
