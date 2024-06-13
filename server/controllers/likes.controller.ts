import { Query } from "../db/pool";
import { type Request, type Response } from "express";

export const getLikes = async (req: Request, res: Response) => {
  try {
    const getLikesQuery = `SELECT userId FROM likes WHERE postId = ?;`;
    const result = await Query(getLikesQuery, [req.query.postId]);
    return res.status(200).json(result.map((item: any) => item.userId));
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};

export const addLike = async (req: Request, res: Response) => {
  try {
    const { userInfo } = req;

    const checkLikeQuery =
      "SELECT id FROM likes WHERE postId = ? AND userId = ?";
    const foundLike = await Query(checkLikeQuery, [
      req.body.postId,
      userInfo.id
    ]);

    if (foundLike.length > 0) {
      const deleteLikeQuery = "DELETE FROM likes WHERE id = ?";
      await Query(deleteLikeQuery, [foundLike[0].id]);
      return res.status(200).json({ msg: "The like was deleted" });
    } else {
      const addLikeQuery = "INSERT INTO likes SET ?;";
      const values = {
        userId: userInfo.id,
        postId: req.body.postId
      };
      const result = await Query(addLikeQuery, values);
      const getAddedLikeQuery = `SELECT userId, postId FROM likes WHERE id = ?;`;
      const addedLike = await Query(getAddedLikeQuery, [result.insertId]);
      return res
        .status(200)
        .json({ msg: "Like has been added!", addedLike: addedLike[0] });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ msg: `Something went wrong: \n${error.message}` });
  }
};
