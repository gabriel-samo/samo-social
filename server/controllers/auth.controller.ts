import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { Query } from "../db/pool";
import { Request, type Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    // check if user exists
    const findUserQuery = "SELECT * FROM users WHERE username = ?";
    const result = await Query(findUserQuery, [req.body.username]);
    if (result.length !== 0) {
      console.log(result);
      return res.status(409).json({ msg: "User already exists" });
    }
    // Hash the password
    const hashedPass = bcrypt.hashSync(req.body.password, 10);

    // Send user to db
    const createUserQuery = "INSERT INTO users SET ?";
    const values = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      name: req.body.name
    };
    await Query(createUserQuery, values);

    return res
      .status(200)
      .json({ msg: `User ${req.body.username} was successfully created` });
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Check if user exists
    const findUserQuery = "SELECT * FROM users WHERE username = ?";
    const result = await Query(findUserQuery, [req.body.username]);
    if (result.length === 0) {
      return res.status(404).json({ msg: "User was not found" });
    }
    // separate password from other user credentials
    const { password, ...otherCred } = result[0];
    // create token
    const token = jwt.sign(otherCred, config.jwt.secret!, {
      expiresIn: config.jwt.expires
    });
    // return the token in headers
    return res
      .status(200)
      .header("Access-Control-Expose-Headers", "Authorization")
      .header("Authorization", token)
      .json({ msg: `User ${req.body.username} was logged in! :)` });
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};

export const logout = (req: Request, res: Response) => {};
