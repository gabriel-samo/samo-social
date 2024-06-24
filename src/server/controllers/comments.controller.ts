import moment from "moment";
import { Query } from "../db/pool";
import { type Request, type Response } from "express";

export const getComments = async (req: Request, res: Response) => {
  try {
    const getCommentsQuery = `
    SELECT c.*, u.id AS userId, name, profilePic 
    FROM comments AS c 
    JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ? 
    ORDER BY c.createdAt DESC`;

    const result = await Query(getCommentsQuery, [req.query.postId]);

    return res.status(200).json(result);
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { userInfo } = req;
    const addCommentQuery = "INSERT INTO comments SET ?;";

    const values = {
      desc: req.body.desc,
      createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userId: userInfo.id,
      postId: req.body.postId
    };

    const result = await Query(addCommentQuery, values);

    const getAddedCommentQuery = `
      SELECT c.*, u.id AS userId, name, profilePic 
      FROM comments AS c 
      JOIN users AS u ON (u.id = c.userId) 
      WHERE c.id = ?`;

    const newComment = await Query(getAddedCommentQuery, [result.insertId]);

    return res.status(200).json({
      msg: "Comment has been added!",
      addedComment: newComment[0]
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};
