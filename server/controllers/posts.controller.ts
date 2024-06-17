import moment from "moment";
import { Query } from "../db/pool";
import { type Request, type Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const { userInfo } = req;
    const getAllPostsQuery = userId
      ? `SELECT p.*,u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
          WHERE p.userId = ? ORDER BY p.createdAt DESC`
      : `SELECT p.*,u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) 
          LEFT JOIN relationships AS r ON (p.userId = r.followedUserId)
          WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;

    const values = userId ? [userId] : [userInfo.id, userInfo.id];

    const result = await Query(getAllPostsQuery, values);

    return res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};

export const addPost = async (req: Request, res: Response) => {
  try {
    const { userInfo } = req;

    const addPostQuery = "INSERT INTO posts SET ?;";
    const values = {
      desc: req.body.desc,
      img: req.body.img,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userId: userInfo.id
    };
    const result = await Query(addPostQuery, values);

    const getAddedPostQuery = `
        SELECT p.*,u.id AS userId, name, profilePic 
        FROM posts AS p JOIN users AS u ON (u.id = p.userId)
        WHERE p.id = ?`;

    const addedPost = await Query(getAddedPostQuery, [result.insertId]);

    return res
      .status(200)
      .json({ msg: "Post has been created!", addedPost: addedPost[0] });
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};
