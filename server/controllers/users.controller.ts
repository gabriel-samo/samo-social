import { Query } from "./../db/pool";
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const getUser = async (req: Request, res: Response) => {
  try {
    const getUserQuery = "SELECT * FROM users WHERE id = ?";
    const result = await Query(getUserQuery, [req.params.userId]);
    const { password, ...otherCreds } = result[0];
    return res.status(200).json(otherCreds);
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong!\n${error.message}` });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userInfo } = req;
    const newUserCreds = { ...req.body };

    // deleting all the fileds that are 'null' in the object
    for (let item in newUserCreds) {
      if (newUserCreds[item] === null) {
        delete newUserCreds[item];
      }
    }

    const updateUserQuery = "UPDATE users SET ? WHERE id = ?";

    const reuslt = await Query(updateUserQuery, [newUserCreds, userInfo.id]);
    if (reuslt.affectedRows > 0) {
      const getUserQuery = "SELECT * FROM users WHERE id = ?";
      const updatedUser = await Query(getUserQuery, [userInfo.id]);
      const { password, ...otherCred } = updatedUser[0];
      console.log(otherCred);
      const newJWT = jwt.sign(otherCred, config.jwt.secret!, {
        expiresIn: config.jwt.expires
      });
      return res
        .status(200)
        .header("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", newJWT)
        .json({ msg: "User was updated successfully :)" });
    }
    return res.status(403).json({ msg: "You can only update YOUR user." });
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Somthing went wrong!: \n ${error.message}` });
  }
};
